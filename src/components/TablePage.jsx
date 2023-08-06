import React, { useState } from 'react';
import SlidingSwitch from './SlidingSwitch'; // Import the SlidingSwitch component

const TablePage = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [pressedHeaderIndex, setPressedHeaderIndex] = useState(null);

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  const handleNextButtonClick = () => {
    alert('Next button is pressed!');
  };

  const handleHeaderClick = (index) => {
    setPressedHeaderIndex(index === pressedHeaderIndex ? null : index);
  };

  // 2D array to store values for each row and column
  const data = [
    ['', 'Mobile', 'Basic', 'Standard', 'Premium'],
    ['Monthly Pricing', '₹100', '₹200', '₹500', '₹700'],
    ['Video Quality', 'Good', 'Good', 'Better', 'Best'],
    ['Resolution', '480p', '480p', '1080p', '4k + HDR'],
    ['Devices You Can Watch', '2', '4', '4', '4'],
  ];

  const isHeaderSelected = (colIndex) => pressedHeaderIndex === colIndex;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div style={{ padding: '5vh' }}>
        <table className="table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-1/5">
                {/* Use the SlidingSwitch component here */}
                <SlidingSwitch checked={isSwitchOn} onChange={handleSwitchChange} />
              </th>
              {[...Array(4)].map((_, index) => (
                <th key={index + 1} className="w-1/5" style={{ padding: '3vh' }}>
                  {/* Header content */}
                  <div
                    className={`header-wrapper ${isHeaderSelected(index) ? 'elevated' : ''}`}
                    onClick={() => handleHeaderClick(index)}
                    style={{
                      width: isHeaderSelected(index) ? 'calc(5vw + 5vh)' : '5vw',
                      height: isHeaderSelected(index) ? 'calc(10vh + 5vh)' : '10vh',
                      backgroundColor: isHeaderSelected(index) ? '#1E40AF' : '#90CDF4',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #ccc',
                      padding: '5px', // Add padding from all sides
                      transition: 'background-color 0.2s ease, height 0.2s ease, width 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {data[0][index + 1]}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((rowData, rowIndex) => (
              <tr key={rowIndex} className={`text-center ${rowIndex > 0 ? 'border-t border-gray-500' : ''}`}>
                {rowData.map((value, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">
                    <div
                      className={`column-wrapper`}
                      style={{
                        height: '10vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: isHeaderSelected(pressedHeaderIndex) && colIndex === pressedHeaderIndex+1 ? 'gray' : 'black',
                        fontSize: isHeaderSelected(pressedHeaderIndex) && colIndex === pressedHeaderIndex+1 ? '18px' : 'inherit',
                      }}
                    >
                      {value}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '5vh' }}>
        <button
          onClick={handleNextButtonClick}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePage;
