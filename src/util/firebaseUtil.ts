import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Hashids from "hashids";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const ipHash = new Hashids("TheHydrant IP", 32);
const countHash = new Hashids("TheHydrant Full", 8);
const bucketSize = 20;

type Post = {
  content: string;
  timestamp: number;
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// return length 32 hash of ip
const encodeIp = (ipAddress: string): string => {
  const preHash = ipAddress.split("").filter(c => ![":", "."].includes(c)).join("");
  return ipHash.encodeHex(preHash);
};

// returns length 8 hash of count
const encodeCount = (count: number): string => {
  const preHash = `${count}`.padStart(8, '0');
  return countHash.encodeHex(preHash);
};

const decodeCount = (hash: string): number => {
  return parseInt(countHash.decodeHex(hash));
};

// bucketId: 32-byte hash of IP + 8-byte hash of count
export const createPost = (content: string, bucketId: string) => {
  const docRef = db.collection("buckets").doc(bucketId);
  const newPost = { content, timestamp: Date.now() };
  return docRef.update({ posts: firebase.firestore.FieldValue.arrayUnion(newPost) })
    .then(() => {
      docRef.get().then((doc) => {
        const posts = doc.get("posts");
        if (posts.length >= bucketSize) {
          const id: string = bucketId.substring(0, 32);
          const count: number = decodeCount(bucketId.substring(32));
          createBucket(id + encodeCount(count + 2)).then((bucketId) => {
            db.collection("bucketsByIp").doc(id).update({
              bucketIds: firebase.firestore.FieldValue.arrayUnion(bucketId)
            });
          });
        }
      })
    })
};

const createBucket = (bucketId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.collection("buckets").doc(bucketId).set({ posts: [] })
      .then(() => resolve(bucketId))
      .catch(err => reject(err));
  });
};

export const getPostsInBucket = (bucketId: string): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    db.collection("buckets").doc(bucketId).get()
      .then((doc) => resolve(doc.get("posts")))
      .catch(err => reject(err));
  });
}

export const getCurrentBucket = (
  bucketId: string,
  setPosts: SetState<Post[]>
): () => void => {
  const docRef = db.collection("buckets").doc(bucketId);
  const unsubscribe: () => void = docRef.onSnapshot((snapshot) => {
    const posts = snapshot.get("posts");
    setPosts(posts);
  });
  return unsubscribe;
};

export const getBucketIds = (
  ipAddress: string,
  setBucketIds: SetState<string[]>
) => {
  const id = encodeIp(ipAddress);
  const docRef = db.collection("bucketsByIp").doc(id);
  return docRef.get()
    .then((doc) => {
      if (!doc.exists) {
        const promise1 = createBucket(id + encodeCount(0));
        const promise2 = createBucket(id + encodeCount(1));
        return Promise.all([promise1, promise2]).then((bucketIds) => {
          return docRef.set({ bucketIds });
        });
      }
      return Promise.resolve();
    })
    .then(() => {
      const unsubscribe: () => void = docRef.onSnapshot((snapshot) => {
        const bucketIds = snapshot.get("bucketIds");
        setBucketIds(bucketIds);
      });
      return unsubscribe;
    })
    .catch((err) => {
      console.error(err);
      return () => {};
    });
};