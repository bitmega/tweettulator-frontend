import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Comment, Form, Grid } from "semantic-ui-react";
import {
  useCreateThreadMutation,
  useGetThreadsQuery,
} from "../../app/services/threadAPI";
import { IUser } from "../../interfaces/Auth";
import { IThread } from "../../interfaces/Comment";
import { RANDOM_AVATAR } from "../../utils/constants";
import { relativeTimeFromNow } from "../../utils/getRelativeTime";
import { OPERATOR_PATTERN } from "../../utils/regex";
import { selectCurrentUser } from "../auth/authSlice";

type CommentItemProps = {
  comment: IThread;
};
type ReplyCommentState = {
  error: string | boolean;
  content: string;
};

const renderCommentText = (comment: IThread): JSX.Element => {
  if (comment.parent?.id) {
    return (
      <>
        <p>
          Operator: <b>{comment.text}</b>
        </p>
        <p>
          Result: <b>{comment.currentResult.toFixed(2)}</b>{" "}
        </p>
      </>
    );
  }

  return (
    <p>
      <b>{comment.text}</b>
    </p>
  );
};

export default function CommentItem({
  comment,
}: CommentItemProps): JSX.Element {
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [replyState, setReplyState] = useState<ReplyCommentState>({
    content: "",
    error: false,
  });
  const [createThread, { isLoading, isError, error }] =
    useCreateThreadMutation();
  const user = useSelector(selectCurrentUser) as IUser;
  const { refetch } = useGetThreadsQuery();

  const handleOpenReply = (): void => {
    setOpenReply(!openReply);
  };
  const handleReplyInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    const { value } = event.target;

    if (OPERATOR_PATTERN.test(value)) {
      setReplyState(() => ({
        content: value,
        error: false,
      }));
    } else {
      setReplyState((prev: ReplyCommentState) => ({
        ...prev,
        error: "Please input valid operator",
      }));
    }
  };
  const handleReply = async (): Promise<void> => {
    const { error, content } = replyState;
    if (!error) {
      await createThread({
        text: content,
        owner: `${user.first_name} ${user.last_name}`,
        parentId: comment.id,
      });
      refetch();
    }
  };

  useEffect(() => {
    if (isError && error) {
      let message = "Unexpected error";
      if ("error" in error) {
        message = error.error;
      }
      toast(message, { type: "error" });
    }
  }, [isError, error]);

  return (
    <Comment>
      <Comment.Avatar as="a" src={RANDOM_AVATAR + comment.owner} />
      <Comment.Content>
        <Comment.Author as="a">{comment.owner}</Comment.Author>
        <Comment.Metadata>
          <span>{relativeTimeFromNow(comment.createdAt)}</span>
        </Comment.Metadata>
        <Comment.Text style={{ marginTop: "16px" }}>
          {renderCommentText(comment)}
        </Comment.Text>
        <Comment.Actions>
          <a onClick={handleOpenReply}>{openReply ? "Close" : "Reply"}</a>
        </Comment.Actions>
      </Comment.Content>
      {openReply && (
        <Form reply>
          <Form.Input
            size="big"
            placeholder="Your operator"
            required
            label="Comment"
            error={replyState.error}
            onChange={handleReplyInputChange}
          />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
            onClick={handleReply}
            loading={isLoading}
          />
        </Form>
      )}
      {comment.comments?.length
        ? comment.comments.map((child) => (
            <Comment.Group size="big" key={child.id}>
              <CommentItem comment={child} />
            </Comment.Group>
          ))
        : null}
    </Comment>
  );
}
