import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";

export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
