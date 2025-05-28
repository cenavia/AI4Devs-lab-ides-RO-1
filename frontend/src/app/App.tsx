import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
