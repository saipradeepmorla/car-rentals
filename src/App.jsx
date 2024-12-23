import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <main>
      <Header />
      <HomePage />
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default App;
