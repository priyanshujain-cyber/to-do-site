import React from "react";
import "../styles/Home.css";
import videoFile from "../assests/ani.mp4";
import { useNavigate } from "react-router-dom";

const Home = ({ state }) => {
  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* TOP HERO TEXT */}
      <div className="hero-content">
        <p className="tagline">LEARN. BUILD. GET PLACED.</p>

        <h1>
          Become The Software Engineer <br />
          That <span>Companies</span> Want To Hire!
        </h1>

        <p className="subtext">
          Track and manage your entries in a modern dashboard.
        </p>

        <button className="cta-btn" onClick={() => navigate('/add')}>
          Start Journey →
        </button>
      </div>

      {/* VIDEO + CARDS SECTION */}
      <div className="feature-section">

        {/* LEFT CARDS */}
        <div className="feature-left">

          <div className="mini-card">
            <h3> {state.records.length}</h3>
            <p>Total Records</p>
          </div>

          <div className="mini-card">
            <h3>🔥 High Priority</h3>
            <p>
              {state.records.filter(r => r.priority === "High").length} items
            </p>
          </div>

          <div className="big-card" >
            
            <h2>Manage Your Data Easily</h2>
            <p>Track, edit and organize entries in one place.</p>
            <button onClick={()=>navigate('/table')}>View Table </button>
          </div>

        </div>

    
        <div className="feature-video">
          <video
            src={videoFile} 
            autoPlay
            muted
            loop
          />
         
        </div>

      </div>

    </section>
  );
};

export default Home;