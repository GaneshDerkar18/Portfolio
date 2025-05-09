import React from 'react';
import SkillsCube from './SkillsCube'; // Import the SkillsCube component

const Body = () => {
  return (
    <div className="flex flex-col md:flex-row items-center p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex-1 max-w-lg pl-4 md:pl-8 mb-8 md:mb-0">
        <p className="text-lg leading-relaxed  text-gray-700 dark:text-gray-300 animate-fadeInSlideUp mb-6">
          <span className='text-4xl'>
          Hi, I'm Ganesh Derkar, 
          </span>
          <br></br>
          <p className='text-2xl'>
          a passionate developer with experience in
          React.js and a love for creating dynamic and responsive web
          applications. Explore my projects, learn more about my skills, and
          feel free to reach out!
          </p>
        </p>
        <div className="flex items-center justify-start mb-6">
          <a
            href="https://drive.google.com/file/d/1w-sSoS0w3oAzcuBZ5mHuCXCv7yWc0xdh/view?usp=sharing" // Replace with your actual email address
            className="px-6 py-3 bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 font-semibold rounded-md shadow-lg hover:bg-blue-700 dark:hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg"
          >
            my_Resume
          </a>
              <a
            href="mailto:ganesh.derkar.dev@gmail.com" // Replace with your actual email address
            className="px-6 py-3 bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 font-semibold rounded-md shadow-lg hover:bg-blue-700 dark:hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg"
          >
            Hire Me
          </a>
        </div>
        <div className="flex-col justify-center space-x-4">
          <a 
            href="https://github.com/GaneshDerkar18" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a 
            href="https://x.com/_GaneshDerkar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/ganesh-derkar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-700 transition-colors"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <SkillsCube /> {/* Replace the image with the SkillsCube component */}
      </div>
    </div>
  );
}

export default Body;
