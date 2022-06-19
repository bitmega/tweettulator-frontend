import { nanoid } from "@reduxjs/toolkit";
import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw";
import { LoginRequest, UserResponse } from "../interfaces/Auth";
import mockData from "./data.json";
const token = nanoid();

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] =
  [
    rest.get("/protected", (req, res, ctx) => {
      if (req.headers.get("authentication") !== `Bearer ${token}`) {
        return res(ctx.json({ message: "You shall not pass" }), ctx.status(401));
      }
      return res(ctx.json({ success: true, message: "This is top secret" }));
    }),
    rest.post("/login", (req, res, ctx) => {
      const { username } = req.body as LoginRequest;
      const data: UserResponse = {
        token,
        user: {
          first_name: username,
          last_name: "NUS"
        },
      }
      return res(
        ctx.delay(400),
        ctx.json({ data })
      );
    }),
    rest.get("/api/v1/threads", (req, res, ctx) => {
      return res(ctx.json({
        data: mockData
      }))
    })
  ];
