import Footer from "./components/Footer";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RoomsPage from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";

import { BrowserRouter as Router, Route } from "react-router-dom";
import BookingPage from "./pages/Bookig";
import RegisterPage from "./pages/Register";

import RoomContextProvider from "./context/GlobalContextProvider";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <RoomContextProvider>
      <Router>
        <div className="App">
          <Route path="/" exact component={HomePage} />
          <Route path="/rooms" exact component={RoomsPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <PrivateRoute path="/booking/:roomId" exact>
            <BookingPage />
          </PrivateRoute>
          <PrivateRoute path="/mybookings" exact>
            <MyBookings />
          </PrivateRoute>
        </div>

        <Footer />
      </Router>
    </RoomContextProvider>
  );
}

export default App;
