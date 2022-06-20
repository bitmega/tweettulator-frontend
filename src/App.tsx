import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { AppRouting } from "./app/route";
import AppLayout from "./layout";

function App() {
  return (
    <AppLayout>
      <AppRouting />
      <ToastContainer />
    </AppLayout>
  );
}

export default App;
