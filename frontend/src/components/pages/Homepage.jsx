import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="title">Welcome to Habiter</h1>
        <p className="subtitle">Build better habits and track your progress every day!</p>
        
        <div className="auth-buttons">
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
