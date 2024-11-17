import React, { useState } from "react";
import { motion } from "framer-motion";
import "./HoverEffect.css";

const HoverEffect = () => {
  const lineCount = 51; // Total number of lines
  const lineWidth = 2; // Width of each line
  const spacing = 8; // Space between lines
  const maxScale = 2; // Maximum scale for the hovered line
  const maxEffectRadius = 5; // Number of neighboring lines affected

  const [hoverX, setHoverX] = useState(null); // Track mouse X position

  // Calculate the height of each line based on a repeating pattern
  const calculateHeight = (index) => (index % 10 === 0 ? 90 : 60); // Tall line every 10th line

  const calculateOpacity = (index) => (index % 10 === 0 ? 1 : 0.3); // Full opacity for tall lines

  // Calculate the scale for each line based on the mouse position
  const calculateScale = (lineIndex) => {
    if (hoverX === null) return 1;

    const linePosition = lineIndex * (lineWidth + spacing) + lineWidth / 2;
    const distance = Math.abs(hoverX - linePosition);

    if (distance < maxEffectRadius * (lineWidth + spacing)) {
      const normalizedDistance =
        1 - distance / (maxEffectRadius * (lineWidth + spacing));
      return 1 + (maxScale - 1) * normalizedDistance;
    }

    return 1; // Default scale for lines outside the effect radius
  };

  return (
    <div
      className="hover-container"
      onMouseMove={(e) => {
        const containerRect = e.currentTarget.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;

        // Ensure hoverX stays within the bounds of the lines
        const clampedX = Math.max(
          0,
          Math.min(relativeX, lineCount * (lineWidth + spacing) - spacing)
        );
        setHoverX(clampedX);
      }}
      onMouseLeave={() => setHoverX(null)} // Reset hoverX when the mouse leaves the container
    >
      {Array.from({ length: lineCount }).map((_, index) => (
        <motion.div
          key={index}
          className="line"
          style={{
            height: `${calculateHeight(index)}px`, // Line height based on pattern
            width: `${lineWidth}px`, // Constant line width
            opacity: calculateOpacity(index), // Adjust opacity dynamically
          }}
          animate={{
            scaleY: calculateScale(index), // Scale based on proximity to hoverX
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
