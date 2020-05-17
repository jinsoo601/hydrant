import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";

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

type Post = {
  id: string;
  content: string;
  timestamp: number;
  ipAddress: string;
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export const getAndSetPostsByIpAddress = (
  ipAddress: string,
  setPosts: SetState<Post[]>
): void => {
  db.collection("posts").where("ipAddress", "==", ipAddress).onSnapshot((snapshot) => {
    const posts: Post[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data()} as Post);
    });
    setPosts(posts);
  }, (error) => {
    console.error(error);
  });
};

export const createPost = (content: string, ipAddress: string) => {
  return db.collection("posts").add({
    content,
    timestamp: Date.now(),
    ipAddress
  });
}