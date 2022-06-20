import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "semantic-ui-react";
import { useCreateThreadMutation } from "../../app/services/threadAPI";
import { IUser } from "../../interfaces/Auth";
import { selectCurrentUser } from "../auth/authSlice";

export default function NewThreadModal(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const [createThread, { isLoading, isError, error }] =
    useCreateThreadMutation();
  const user = useSelector(selectCurrentUser) as IUser;

  const handleCreateNewThread = async (): Promise<void> => {
    await createThread({
      text,
      owner: user.first_name + " " + user.last_name,
    });
    setOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    setText(value);
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
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button loading={isLoading}>Create new thread</Button>}
      size="small"
    >
      <Modal.Header>Create new thread</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            onChange={handleInputChange}
            type="number"
            placeholder="Your message"
            size="massive"
          ></Form.Input>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={handleCreateNewThread}
          loading={isLoading}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
