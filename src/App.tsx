import { useEffect, useState } from "react";
import Menu from "./Components/Menu";
import BookRide from "./Components/BookRide/BookRide";
import OfferRide from "./Components/OfferRide/OfferRide";
import UserRidesHistory from "./Components/UserRidesHistory";
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import React from "react";

function App() {
    const [userLoged, setUserLoged] = useState<boolean>(false)
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage userLogedIn={() => {
                    setUserLoged(true); console.log("ivk");
                }} />} />
                {(localStorage.getItem("userId")) ?
                    <>
                        <Route path="/Menu" element={<Menu />} />
                        <Route path="/BookRide" element={<BookRide />} />
                        <Route path="/OfferRide" element={<OfferRide />} />
                        <Route path="/MyRides" element={<UserRidesHistory />} /> </>
                    : <></>}
            </Routes>
        </div>
    );
}

export default App;
