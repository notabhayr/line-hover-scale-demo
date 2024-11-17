import React, { useState } from "react";
import { motion } from "framer-motion";
import "./HoverEffect.css";

const HoverEffect = () => {
  const lineCount = 51; // Total number of lines
  const lineWidth = 2; // Width of each line
  const spacing = 8; // Space between lines
  const maxScale = 2; // Maximum scale for the hovered line
  const maxEffectRadius = 5; // Maximum number of neighboring lines affected

  const [hoverX, setHoverX] = useState(null); // Track mouse X position relative to the container

  // Calculate the height of each line based on the repeating pattern
  const calculateHeight = (index) => {
    // One big line (60px) followed by nine smaller lines (40px)
    return index % 10 === 0 ? 90 : 60;
  };

  const calculateOpacity = (index) => {
    // One big line (opacity 1) followed by nine smaller lines (opacity 0.3)
    return index % 10 === 0 ? 1 : 0.3;
  };

  // Calculate the scale for each line based on the mouse position
  const calculateScale = (lineIndex) => {
    if (hoverX === null) return 1; // Default scale when no hover

    // Calculate the x-position of the line within the container
    const linePosition = lineIndex * (lineWidth + spacing) + lineWidth / 2;

    // Calculate the distance between the mouse and the line
    const distance = Math.abs(hoverX - linePosition);

    // Scale the line based on its distance from the mouse
    if (distance < maxEffectRadius * (lineWidth + spacing)) {
      const normalizedDistance =
        1 - distance / (maxEffectRadius * (lineWidth + spacing));
      return 1 + (maxScale - 1) * normalizedDistance;
    }

    return 1; // Default scale outside effect radius
  };

  return (
    <div
      className="hover-container"
      onMouseMove={(e) => {
        const containerRect = e.currentTarget.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;

        // Only track hoverX if within the bounds of the lines and spacing
        if (relativeX >= 0 && relativeX <= lineCount * (lineWidth + spacing)) {
          setHoverX(relativeX);
        } else {
          setHoverX(null);
        }
      }}
      onMouseLeave={() => setHoverX(null)} // Reset hover when the mouse leaves the container
    >
      {Array.from({ length: lineCount }).map((_, index) => (
        <motion.div
          key={index}
          className="line"
          style={{
            height: `${calculateHeight(index)}px`, // Adjust line height based on pattern
            width: `${lineWidth}px`, // Line width remains constant
            opacity: calculateOpacity(index), // Adjust opacity dynamically
          }}
          animate={{
            scaleY: calculateScale(index), // Scale based on proximity
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      ))}
    </div>
  );
};

export default HoverEffect;
