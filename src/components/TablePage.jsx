import React, { useState } from 'react';
import Switch from 'react-switch';

const TablePage = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  const handleNextButtonClick = () => {
    // This function will be called when the Next button is clicked.
    alert('Next button is pressed!');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div style={{ padding: '5vh' }}>
        <table className="table-fixed border-collapse">
          <thead>
            {/* Table header content */}
            <tr>
              <th className="w-1/5">
                {/* Switch content */}
                <div
                  style={{
                    width: '10vw',
                    height: '10vh',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    marginLeft: isSwitchOn ? '20px' : '0',
                  }}
                >
                  <Switch
                    onChange={handleSwitchChange}
                    checked={isSwitchOn}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={24}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
                    height={16}
                    width={40}
                  />
                </div>
              </th>
              {[...Array(4)].map((_, index) => (
                <th key={index + 1} className="w-1/5">
                  {/* Header content */}
                  <div
                    style={{
                      width: '10vw',
                      height: '10vh',
                      backgroundColor: 'navy',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #ccc',
                      marginLeft: '5vh' ,
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
                      Header {index + 1}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table body content */}
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className={`text-center ${rowIndex > 0 ? 'border-t border-gray-500' : ''}`}>
                {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">
                    Row {rowIndex + 1}, Col {colIndex + 1}
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
