import React, { useState } from 'react';

const SlidingSwitch = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <div
      style={{
        backgroundColor: 'navy',
        width: '20vh', // Set the width of the div as per your requirement
        height: '10vh', // Set the height of the div as per your requirement
        borderRadius: '30px', // Set the borderRadius to 30px to make it slightly rounded
        display: 'flex', // Use flexbox to position the text side by side
        justifyContent: 'center', // Center the text horizontally
        alignItems: 'center', // Center the text vertically
        position: 'relative', // Set position to relative to allow absolute positioning of the circular container
        overflow: 'hidden', // Hide any overflow
        cursor: 'pointer', // Show pointer cursor on hover to indicate clickability
      }}
      onClick={handlePress}
    >
      <span
        style={{
          color: 'white',
          padding: '0 5px',
          position: 'relative',
          zIndex: 0,
        }}
      >
        Monthly
      </span>
      <div
        style={{
          width: '10vh', // Set the width of the circular container
          height: '10vh', // Set the height of the circular container
          borderRadius: '50%', // Make it circular
          position: 'absolute', // Set position to absolute for precise positioning
          top: '50%', // Position the circular container vertically in the center
          left: isPressed ? 'calc(100% - 5vh)' : '5vh', // Position the circular container to the right when pressed
          transform: 'translate(-50%, -50%)', // Center the circular container both horizontally and vertically
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background color
          transition: 'left 0.2s ease', // Add a smooth transition for the movement animation
          zIndex: 2, // Ensure the circular container is behind the text
        }}
      />
      <span style={{ color: 'white', padding: '0 5px' }}>Yearly</span>
    </div>
  );
};

export default SlidingSwitch;
