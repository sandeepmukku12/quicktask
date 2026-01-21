import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthContextProvider>
  );
}

export default App;
