import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51LlWwVSFGGJdMYs7FwA8AHse2pEdlhcVmasBaqccUtdH2u5p4Pis3Iy2TKihFd5zO7rm7qipCIirW7grFFMcYaB300W0eSpdp7");
function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if(authUser) {
        // the user just logged in / the was user was logged in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      } else {
        // the user logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [])
return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout"> 
            <Header/>        
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header/>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  
  );
}
export default App;