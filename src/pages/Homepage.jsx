import React from "react";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1 className="test">WorldWise</h1>

      <Link to="/app">go to the app</Link>
    </div>
  );
}
