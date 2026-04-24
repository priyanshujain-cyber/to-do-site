import React, { useReducer } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { reducer, initialState } from "./reducer";
import "./styles/style.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Layout>
      <Routes>
        <Route
          path="/add"
          element={<Form state={state} dispatch={dispatch} />}
        />
        <Route
          path="/table"
          element={<Table state={state} dispatch={dispatch} />}
        />
        <Route path="/" element={<Home state={state} dispatch={dispatch} />} />
        <Route path="/profile" element={<Profile state={state} dispatch={dispatch} />} />
      </Routes>
    </Layout>
  );
}