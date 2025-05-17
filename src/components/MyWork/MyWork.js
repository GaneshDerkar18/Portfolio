import React from 'react';
import { Link } from 'react-router-dom';
// import todoImage from '../../assect/todolist.png'

// Flattened list of all projects
const allProjects = [
  {
    title: 'Food delivery App',
    description: 'Food Delivery Application using react js Technologies Used React.js HTML CSS JavaScript API integration Key Features React Router DOM: Used for client-side routing. useState and useEffect: Leveraged React hooks for managing state and side effects. Custom Hooks: Created custom hooks to abstract and reuse stateful logic across components.',
    image: '/assects/fooddeli.png',
    githubLink: 'https://github.com/GaneshDerkar18/food-delivery-app',
    demoLink: '#',
  },
  {
    title: 'Todo-List',
    description: 'System Design Frontend: Developed using React.js. Utilizes functional components and hooks for managing state and side effects. Styled with CSS for a classic, user-friendly interface. Features responsive design to adapt to different screen sizes. Features: Add new tasks to the list. Edit existing tasks. Delete tasks from the list. Toggle task completion status. Search functionality to filter tasks.',
    image: '/assects/todolist.png',
    githubLink: 'https://github.com/GaneshDerkar18/todo-list-react-frontend',
    demoLink: 'https://GaneshDerkar18.github.io/todo-list-react-frontend/',
  },
  {
    title: 'NetflixGpt',
    description: 'Frontend using react backend using firebase live link will be availabe soon as project is fully completed',
    image: '/assects/netflixgpt.png',
    githubLink: 'https://github.com/GaneshDerkar18/NetflixGpt',
    demoLink: 'https://netflixgpt-c0be4.web.app',
  },
  {
    title: 'devTender',
    description: 'backend using node js express js and mongodb',
    image: 'https://via.placeholder.com/300',
    githubLink: 'https://github.com/GaneshDerkar18/devTender',
    demoLink: '#',
  },
  {
    title: 'Text_Extraction form images',
    description: 'to extract text from images using ocr',
    image: '#',
    githubLink: 'https://github.com/Prashik9763/Text-Extraction-from-Image-using-OCR',
    demoLink: '#',
  },

];

const Work = () => {
  return (
    <div className="p-6 sm:p-12 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">My Work</h1>

      <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl">
        {allProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex space-x-6">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.demoLink && project.demoLink !== '#' && (
    <a
      href={project.demoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 dark:text-green-400 hover:underline"
    >
      Live Demo
    </a>
  )}
              </div>
            </div>
            
          </div>
        ))}
      </div>

      <Link
              to="moreabout"
              className="text-blue-600 p-10 dark:text-blue-400 font-semibold underline hover:text-blue-800 dark:hover:text-blue-300 transition"
            >
              More About Me →
            </Link>
    </div>
  );
};

export default Work;
