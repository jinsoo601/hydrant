import React from "react";
import { createUseStyles, ThemeProvider } from "react-jss";
import Header from "./components/Header";
import Input from "./components/Input";
import PostDateChunk from "./components/PostDateChunk";
import LoadButton from "./components/LoadButton";
import util from "./util";
import theme from "./theme";
import { Post } from "./types";

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

const App: React.FC = () => {
  const [ipAddress, setIpAddress] = React.useState("");
  const [lastBucketId, setLastBucketId] = React.useState(""); // used for fetching older posts
  const [bucketIds, setBucketIds] = React.useState<string[]>([]);
  const [olderPosts, setOlderPosts] = React.useState<Post[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const unsubBucketsByIpRef = React.useRef(() => {});
  const unsubCurrentBucketRef = React.useRef(() => {});
  const listContainerRef = React.useRef<HTMLDivElement>(null);
  const classes = useStyles();

  React.useEffect(() => {
    util.getClientIpAddress()
      .then((ipAddress) => {
        setIpAddress(ipAddress);
        return util.getBucketIds(ipAddress, setBucketIds);
      })
      .then((unsubscribe) => {
        unsubBucketsByIpRef.current = unsubscribe;
      })
      .catch(console.error);

    return () => {
      unsubBucketsByIpRef.current();
      unsubCurrentBucketRef.current();
    }
  }, []);

  React.useEffect(() => {
    if (!bucketIds.length) return;
    if (!lastBucketId && bucketIds.length > 2) {
      const id = bucketIds[bucketIds.length - 3];
      util.getPostsInBucket(id).then((res) => {
        setOlderPosts([...res, ...olderPosts]);
        setLastBucketId(id);
      });
    }
    unsubCurrentBucketRef.current(); // unsubscribe from previous bucket
    setOlderPosts([...olderPosts, ...posts]);
    setPosts([]);
    const currentBucketId = bucketIds[bucketIds.length - 2];
    const unsubscribe = util.getCurrentBucket(currentBucketId, setPosts);
    unsubCurrentBucketRef.current = unsubscribe;
  }, [bucketIds]);

  React.useLayoutEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = listContainerRef.current.scrollHeight
    }
  }, [posts]);

  const loadOlderPosts = () => {
    const idx = bucketIds.indexOf(lastBucketId);
    const bucketId = bucketIds[idx - 1];
    util.getPostsInBucket(bucketId).then((res) => {
      setOlderPosts([...res, ...olderPosts]);
      setLastBucketId(bucketId);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Header ipAddress={ipAddress} />
        <div className={classes.postList} ref={listContainerRef}>
          {
            bucketIds.indexOf(lastBucketId) > 0 &&
            <LoadButton onClick={loadOlderPosts} />
          }
          {
            util.chunkPostsByDate([...olderPosts, ...posts]).map((chunk) => (
              <PostDateChunk key={chunk.date} {...chunk} />
            ))
          }
        </div>
        <Input bucketId={bucketIds[bucketIds.length - 2]} />
      </div>
    </ThemeProvider>
  );
};

export default App;