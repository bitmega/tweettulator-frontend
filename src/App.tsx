import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { AppRouting } from "./app/route";

function App() {
  return (
    <>
      <AppRouting />
      <ToastContainer />
    </>
  );
}

export default App;
