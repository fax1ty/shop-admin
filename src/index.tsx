import { Menu } from "components/menu";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ItemsScreen } from "screens/items";
import { CoinsScreen } from "screens/coins";
import { MainScreen } from "screens/main";
import { UsersScreen } from "screens/users";
import { SettingsScreen } from "screens/settings";

import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <main className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/items" element={<ItemsScreen />} />
            <Route path="/coins" element={<CoinsScreen />} />
            <Route path="/users" element={<UsersScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
      </main>
      <ToastContainer position="bottom-right" hideProgressBar />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
