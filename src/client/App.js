import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Feed from './Feed';
import '../../assets/css/style.css'
import Bar from './components/bar';

export default function App() {
  return (
    <div className="container">
      {/* Helmet to control document head that appear on tab */}
      <Helmet>
        <title> Graphbook - Feed </title>
        <meta name = "description" content="Newsfeed"/>
      </Helmet>
      <Feed/>
      <Bar/>
    </div>
  );
}