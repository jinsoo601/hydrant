import { getClientIpAddress } from "./ipUtil";
import { createPost, getBucketIds, getCurrentBucket, getPostsInBucket } from "./firebaseUtil";
import { Post } from "../types";

const chunkPostsByDate = (
  posts: Post[]
): Array<{ date: string, posts: Post[] }> => {
  const result: Array<{ date: string, posts: Post[] }> = [];
  let date: string = "";
  let arr: Post[] = [];
  posts.forEach((post: Post) => {
    const { timestamp } = post;
    const dateStr = new Date(timestamp).toLocaleDateString();
    if (date !== dateStr) {
      if (date) result.push({ date, posts: arr });
      date = dateStr;
      arr = [];
    }
    arr.push(post);
  });
  result.push({ date, posts: arr });
  return result;
};

export default {
  getClientIpAddress,
  createPost,
  getBucketIds,
  getCurrentBucket,
  getPostsInBucket,
  chunkPostsByDate
}