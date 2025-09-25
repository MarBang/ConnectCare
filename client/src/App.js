/*
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import HairInpaintUpload from './components/HairInpaintUpload';


function App() {
  const { user } = useAuth();

  return (
    <>
      <Navigation /> {*/
/* Shows on all pages *//*
}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/profile" replace />}
        />

        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />

         <Route
          path="/image"
          element={user ? <HairInpaintUpload /> : <Navigate to="/login" replace />}
        />

        {*/
/* Catch-all route *//*
}
        <Route
          path="*"
          element={<Navigate to={user ? "/profile" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;*/

import React from "react";
import { Routes, Route } from "react-router-dom";
import HairInpaintUpload from "./components/HairInpaintUpload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HairInpaintUpload />} />
    </Routes>
  );
}

export default App;