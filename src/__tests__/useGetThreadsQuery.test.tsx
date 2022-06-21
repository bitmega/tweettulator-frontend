import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useGetThreadsQuery } from "../app/services/threadAPI";
import { store } from "../app/store";

test("Can run get threads query.", () => {
  const { result } = renderHook(() => useGetThreadsQuery(), {
    wrapper: ({ children }) => <Provider store={store}>{children} </Provider>,
  });
  expect(result.current.isUninitialized).toEqual(false);
});
