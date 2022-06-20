import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useLoginMutation } from "../../app/services/authAPI";
import { LoginRequest } from "../../interfaces/Auth";
import { setCredentials } from "./authSlice";

export default function Login() {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const [formState, setFormState] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const onLoginSubmit: () => Promise<void> = async () => {
    try {
      const result = await login(formState);
      if ("data" in result) {
        dispatch(setCredentials(result.data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="logo192.png" /> Sign in
        </Header>
        <Form size="large" onSubmit={onLoginSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />

            <Button color="teal" fluid size="large" loading={isLoading}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
