import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Tabs.css";

const tabs = ["All Posts", "Engineering", "Community", "Press", "Changelog"];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const tabRefs = useRef([]);

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tabElement = tabRefs.current[activeTab];
      const { offsetWidth, offsetLeft } = tabElement;

      setPillStyle({
        width: offsetWidth + 24, // Include extra space for margin
        left: offsetLeft - 12, // Adjust for the left margin
      });
    }
  }, [activeTab]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`tabs-container ${isDarkMode ? "dark" : "light"}`}>
      {/* Theme Toggle */}
      <div className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "🌙" : "☀️"}
      </div>

      <div className="tabs">
        {/* Background pill */}
        <motion.div
          className="pill"
          style={{ height: 40 }}
          animate={pillStyle}
          transition={{
            type: "spring",
            stiffness: 480.5,
            damping: 30.1,
            mass: 1,
          }}
        />

        {/* Tab labels */}
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${index === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
            ref={(el) => (tabRefs.current[index] = el)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
