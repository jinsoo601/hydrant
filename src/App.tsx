import React from 'react';
import './App.css';
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
  content: string;
  timestamp: Date;
  ipAddress: string;
};

const getClientIpAddress = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener("load", (event) => {
      resolve(req.response);
    });
    req.addEventListener("error", () => {
      reject(new Error("Couldn't get IP Address"));
    });
    req.open("GET", "https://api6.ipify.org");
    req.send();
  });
};

const App: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [ipAddress, setIpAddress] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    getClientIpAddress()
      .then((ipAddress) => {
        setIpAddress(ipAddress);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    if (!ipAddress) return;
    db.collection("posts").where("ipAddress", "==", ipAddress).onSnapshot((snapshot) => {
      const _posts: Post[] = [];
      snapshot.forEach((doc) => {
        _posts.push(doc.data() as Post);
      });
      setPosts(_posts);
    });
  }, [ipAddress])

  const onPost = () => {
    if (!value) return;
    setValue("");
    db.collection("posts").add({
      content: value,
      timestamp: Date.now(),
      ipAddress
    });
  }

  return (
    <div className="App">
      <input
        style={{ border: "1px solid black" }}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={onPost}>Post</button>
      {posts.map(post => (
        <div style={{ border: "1px solid black" }} key={`${post.timestamp}`}>
          <p>{post.content}</p>
          <p>{post.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
