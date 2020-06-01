import React from "react";
import Post from "./Post";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dateLabel: {
    width: "80%",
    margin: "0 auto",
    borderBottom: "1px solid gainsboro",
    padding: 10
  }
});

type Post = {
  content: string;
  timestamp: number;
};

type Props = {
  date: string;
  posts: Post[]
};

const PostDateChunk: React.FC<Props> = (props) => {
  const { date, posts } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.dateLabel}>{date}</div>
      {posts.map(post => <Post key={post.timestamp} {...post} />)}
    </>
  );
};

export default PostDateChunk;