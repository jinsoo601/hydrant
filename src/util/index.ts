import { getClientIpAddress } from "./ipUtil";
import { getAndSetPostsByIpAddress, createPost } from "./firebaseUtil";

export default {
  getClientIpAddress,
  getAndSetPostsByIpAddress,
  createPost
}