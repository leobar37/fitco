import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/login";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
