import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, Planner, NotFound } from "../pages";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/planner" element={<Planner />} />
    </Routes>
  );
}
