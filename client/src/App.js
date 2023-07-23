import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel"
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/notfound/NotFound";
import ContactUs from "./pages/contactus/ContactUs";

import './App.css';
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
