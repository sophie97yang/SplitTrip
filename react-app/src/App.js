import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllTrips from "./components/AllTripsPage";
import CreateTripForm from "./components/CreateTripForm";
import TripDetails from "./components/TripDetailsPage";
import ExpenseDetail from "./components/ExpenseDetails";
import LandingPage from "./components/LandingPage/LandingPage";
import Explore from "./components/Explore";
import UserBookings from './components/UserBookingsPage'
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/404/404";
import BookingDetails from "./components/Explore/BookingDetails";
import ScrollToTop from "./components/ScrollToTop";
import ReactGA from 'react-ga';
import RouteChangeTracker from './components/RouteChangeTracker';
import AddExpenseForm from "./components/AddExpenseForm";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const TRACKING_ID = "UA-297909802-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <ScrollToTop />
      <RouteChangeTracker />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/explore/:city'>
            <Explore />
          </Route>
          <ProtectedRoute path='/trips/new'>
            <CreateTripForm />
            </ProtectedRoute>
          <ProtectedRoute exact path='/trips/:tripId/expenses/new'>
            <AddExpenseForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/trips/:tripId/expenses/:expenseId'>
            <ExpenseDetail />
          </ProtectedRoute>
          <ProtectedRoute exact path='/trips/:id/expenses'>
            <TripDetails type='expense'/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/trips/:id/itineraries'>
            <TripDetails type='itinerary'/>
          </ProtectedRoute>
          <ProtectedRoute path='/trips'>
            <AllTrips />
          </ProtectedRoute>
          <Route path='/bookings/:id'>
            <BookingDetails />
          </Route>
          <Route path='/bookings'>
            <UserBookings />
          </Route>
          <Route exact path='/'>
            <LandingPage isLoaded={isLoaded}/>
          </Route>
          <Route path='*'>
          <PageNotFound />
          </Route>
        </Switch>

      )}
      <Footer />
    </>
  );
}

export default App;
