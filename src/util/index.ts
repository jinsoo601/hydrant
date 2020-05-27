import { getClientIpAddress } from "./ipUtil";
import { createPost, getBucketIds, getCurrentBucket, getPostsInBucket } from "./firebaseUtil";

export default {
  getClientIpAddress,
  createPost,
  getBucketIds,
  getCurrentBucket,
  getPostsInBucket
}