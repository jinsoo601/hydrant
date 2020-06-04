import React from "react";
import Post from "./Post";
import { createUseStyles } from "react-jss";
import { Post as PostType } from "../types";

const useStyles = createUseStyles({
  dateLabel: {
    width: "80%",
    margin: "5px auto 0px",
    borderBottom: "1px solid gainsboro",
    padding: 10,
    position: "sticky",
    top: 0,
    backgroundColor: "white"
  }
});

type Props = {
  date: string;
  posts: PostType[]
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