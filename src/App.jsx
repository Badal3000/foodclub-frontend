import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/users/Login";
import SignUp from "./components/users/SignUp";
import FoodItemDetails from "./components/Fooditem/FoodItemDetails"; // Adjusted naming for consistency

function App() {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        {/* Signup Route */}
        <Route path="/signup" element={<SignUp />} />
        {/* Food Item Details Route */}
        <Route path="/food/:id" element={<FoodItemDetails />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
