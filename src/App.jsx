import React, { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddRecipe from "./pages/AddRecipe";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewRecipe from "./components/ViewRecipe";
import AddYourRecipe from "./components/AddYourRecipe";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  return (
    <div>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route
            path="/login"
            element={!username ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!username ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/addyourrecipe"
            element={username ? <AddYourRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/addrecipe/viewrecipe/:recipeid"
            element={<ViewRecipe />}
          />
          <Route path="/*" element={<div>Page Not Found</div>} />
        </Routes>
      </>
    </div>
  );
};

export default App;
