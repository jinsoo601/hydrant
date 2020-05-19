import React from "react";
import { createUseStyles, ThemeProvider } from "react-jss";
import Post from "./components/Post";
import Header from "./components/Header";
import Input from "./components/Input";
import util from "./util";
import theme from "./theme";

const useStyles = createUseStyles({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  postList: {
    flex: 1,
    overflow: "auto",
    paddingBottom: 10
  }
});

type Post = {
  id: string;
  content: string;
  timestamp: number;
  ipAddress: string;
};

const App: React.FC = () => {
  const [ipAddress, setIpAddress] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    util.getClientIpAddress()
      .then(setIpAddress)
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (!ipAddress) return;
    util.getAndSetPostsByIpAddress(ipAddress, setPosts);
  }, [ipAddress]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Header ipAddress={ipAddress} />
        <div className={classes.postList}>
          {posts.map(post => <Post key={post.id} {...post} />)}
        </div>
        <Input ipAddress={ipAddress} />
      </div>
    </ThemeProvider>
  );
};

export default App;