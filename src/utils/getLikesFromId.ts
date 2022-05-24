import { iLikes } from "../Interface";

//Pass a recommendation id and likeRecomArray and returns the value of the users like 1, 0, -1
export default function getLikesFromId(
  postId: number,
  likedRecom: iLikes[]
): number {
  const liked = likedRecom.filter((recom) => recom.post_id === postId);
  if (liked.length === 0) return 0;
  else {
    return liked[0].likes as number;
  }
}
