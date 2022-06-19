import { Comment } from "semantic-ui-react";
import { IThread } from "../../interfaces/Comment";
import CommentItem from "./CommentItem";

type CommentThreadedProps = {
  data: IThread[];
};
export default function CommentThreaded({ data }: CommentThreadedProps) {
  return (
    <Comment.Group threaded size="big">
      {data.map((thread) => (
        <CommentItem comment={thread} key={thread.id} />
      ))}
    </Comment.Group>
  );
}
