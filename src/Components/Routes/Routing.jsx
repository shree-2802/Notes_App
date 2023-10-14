import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnswerDisplay from "../js/AnswerDisplay";
import Notes from "../js/Notes";
function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/details/:id" element={<AnswerDisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
