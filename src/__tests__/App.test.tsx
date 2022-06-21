import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("renders sign in react", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});
