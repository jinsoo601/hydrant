import React from 'react';
import Post from "./components/Post";
import { ThemeProvider } from 'react-jss';
import util from './util';

const theme = {
  colorPrimary: "#36bc98",
  textLight: "#fff",
  textDark: "#000",
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}

type Post = {
  id: string;
  content: string;
  timestamp: number;
  ipAddress: string;
};

const App: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [ipAddress, setIpAddress] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    util.getClientIpAddress()
      .then(setIpAddress)
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (!ipAddress) return;
    util.getAndSetPostsByIpAddress(ipAddress, setPosts);
  }, [ipAddress]);

  const onPost = () => {
    if (!value) return;
    util.createPost(value, ipAddress).then(() => {
      setValue("");
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <input
          style={{ border: "1px solid black" }}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={onPost}>Post</button>
        {posts.map(post => <Post key={post.id} {...post} />)}
      </div>
    </ThemeProvider>
  );
};

export default App;