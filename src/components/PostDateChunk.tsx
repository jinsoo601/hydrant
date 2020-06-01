import React from "react";
import Post from "./Post";

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
  return (
    <>
      <div>{date}</div>
      {posts.map(post => <Post key={post.timestamp} {...post} />)}
    </>
  );
};

export default PostDateChunk;