import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import { useGetThreadsQuery } from "../../app/services/threadAPI";
import { IUser } from "../../interfaces/Auth";
import { RANDOM_AVATAR } from "../../utils/constants";
import { logout, selectCurrentUser } from "../auth/authSlice";
import CommentThreaded from "./Comments";
import NewThreadModal from "./NewThreadModal";

export default function Thread(): JSX.Element {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { data: threads } = useGetThreadsQuery();
  const user = useSelector(selectCurrentUser) as IUser;

  const handleLogout = (): void => {
    dispatch(logout(undefined));
  };

  return (
    <Grid style={{ height: "100vh" }} verticalAlign="middle" centered>
      <Grid.Row centered columns={2}>
        <Grid.Column style={{ marginTop: "64px" }}>
          <Header as="h2">
            <Image circular src={RANDOM_AVATAR + user.first_name} />{" "}
            {user.first_name + " " + user.last_name}
            <Button floated="right" onClick={handleLogout}>
              Logout
            </Button>
          </Header>
          <NewThreadModal />
          {threads ? <CommentThreaded data={threads} /> : null}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
