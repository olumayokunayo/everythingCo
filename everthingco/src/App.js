import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  Admin,
} from "./components/pages";
import { Header, Footer } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={<AdminOnlyRoute> {<Admin />}</AdminOnlyRoute>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
