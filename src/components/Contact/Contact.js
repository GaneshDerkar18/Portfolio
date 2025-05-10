import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("mnndzgrv");

  if (state.succeeded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-800">
        <p className="text-2xl text-center text-green-600 dark:text-green-400 font-semibold">Thanks for your message!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Contact Me</h1>
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Subject*</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Message*</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full px-6 py-3 bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 font-semibold rounded-md shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

