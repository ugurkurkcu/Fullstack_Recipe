import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Sidebar from "./components/Sidebar";
import CreatePage from "./pages/CreatePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipe/:id" element={<DetailPage />} />
          <Route path="/add" element={<CreatePage />} />
        </Routes>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
