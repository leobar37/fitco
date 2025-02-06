import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/login";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
