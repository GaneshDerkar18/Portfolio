import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import './SkillsCube.css'; // Import the custom CSS file

const SkillsCube = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h2 className="text-2xl font-bold mb-24 text-center text-white-100 dark:text-gray-100">My Skills</h2>
      <div className="cube-container">
        <div className="cube">
          <div className="face front flex items-center bg-opacity-80 justify-center">
            <i className="fab fa-react fa-3x text-blue-600"></i> {/* React icon */}
          </div>
          <div className="face back flex items-center bg-opacity-80 justify-center">
            <i className="fab fa-aws fa-3x text-blue-700"></i> {/* C++ icon */}
          </div>
          <div className="face left flex items-center bg-opacity-80 justify-center">
            <i className="fab fa-js-square fa-3x text-yellow-500"></i> {/* JavaScript icon */}
          </div>
          <div className="face right flex items-center bg-opacity-80 justify-center">
            <i className="fab fa-python fa-3x text-yellow-400"></i> {/* Python icon */}
          </div>
          <div className="face top flex items-center bg-opacity-80 justify-center">
            <i className="fab fa-linux fa-3x text-blue-500"></i> {/* linux icon */}
            {/* <FontAwesomeIcon icon="fa-brands fa-linux" /> */}
          </div>
          <div className="face bottom flex items-center bg-opacity-80 justify-center">
            <i className="fas fa-database fa-3x text-purple-600"></i> {/* Data Science icon */}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SkillsCube;
