import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Game from "./pages/game";
import Main from "./pages/App"
import NewGame from "./pages/new_game";
import Navigation from './menubar';

// import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route exact path="" element={<Main/>}/>
      <Route exact path="create" element={<NewGame/>}/>
      <Route exact path="game">
        <Route exact path=":id" element={<Game/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

document.body.dataset.theme = "light";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
