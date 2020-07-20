import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stepData, setStepData] = useState([]);

  useEffect(() => {
    const url =
      "https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // sort based stepnumber
        const sortedData = data.sort(
          (a, b) => Number(a.stepNumber) - Number(b.stepNumber)
        );
        // mapData by fetching last updated detail and map  only  required data from step object
        const mappedStepData = sortedData.map(step => {
          const stepContent = step.versionContent.sort(
            (a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)
          )[0];
          return {
            stepNumber: step.stepNumber,
            title: stepContent.title,
            body: stepContent.body
          };
        });
        setStepData(mappedStepData);
      });
  }, []);

  return (
    <div className="app">
      <div className="header-container">
        <header>Endless</header>
      </div>
      <div className="container">
        <div className="body">
          <span className="sm-heading">New Games & Accessories</span>
          <span className="title">Monthly Packages.</span>
          <span className="title">Excitement delivered daily.</span>
          <p className="body-content">
            What's the best way to shop for the latest video games and
            peripherals? How about never shopping at all? You'll get new stuff
            on your doorstep -- every month.
          </p>
          <button className="primary-button">GET STARTED</button>
        </div>
      </div>
      <div className="step-container">
        <div className="steps">
          <div className="md-heading">How It Works</div>
          <div className="step-list">
            {stepData.map(step => (
              <div key={step.title} className="step">
                <div className="step-count">0{step.stepNumber}</div>
                <span className="step-title">{step.title}</span>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
