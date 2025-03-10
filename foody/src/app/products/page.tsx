'use client';

import axios from "axios";
import "../globals.css";
import React, { useState } from "react";

const baseUrl = 'http://localhost:9000/api/products';

const TitleOfPage = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">{title}</h1>
      </div>
    </div>
  )
}

const ToastNotification = ({ toastMessage }: { toastMessage: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fade, setFade] = useState(false);

  const handleClose = () => {
    // Start the fade-out effect
    setFade(true);
    
    // After the fade-out completes (500ms), hide the toast completely
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Match this with the duration of the fade-out effect
  };

  return (
    isVisible && (
      <div
        id="toast-success"
        className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 
        ${fade ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{toastMessage}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
          onClick={handleClose} // Attach the event handler here
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    )
  );
};


export default function Page() {
  const title: string = 'Products';
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission status
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null); // Success notification
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null); // Success notification

  interface FormData {
    name: string;
    category: string;
    calories: number;
    proteins: number;
    fibers: number;
    carbohydrates: number;
  }

  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    category: '',
    calories: 0.0,
    proteins: 0.0,
    fibers: 0.0,
    carbohydrates: 0.0,
  });

  const handleChange = <T extends keyof FormData>(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Replace comma with period to handle both formats
    const normalizedValue = value.replace(',', '.');

    // If the value should be a number, handle empty input and decimal numbers properly.
    const parsedValue = ['calories', 'proteins', 'fibers', 'carbohydrates'].includes(name)
      ? normalizedValue === '' ? null : parseFloat(normalizedValue) // Handle empty as null
      : normalizedValue;

    // Set the state with the parsed value
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue, // Update the value for the corresponding field
    }));
  };

  const handleProductCreation = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${baseUrl}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      setFormData({
        name: '',
        category: '',
        calories: 0.0,
        proteins: 0.0,
        fibers: 0.0,
        carbohydrates: 0.0,
      });

      console.log('Form submitted successfully:', response.data);

      setSuccessMessage("Product created successfully!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("Product created successfully!");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }

  return (
    <div>
      <div>
        <TitleOfPage title={title} />
        <div>
          <div className='p-5 flex flex-col w-full gap-10'>

            <form className="max-w-sm mx-auto" onSubmit={handleProductCreation}>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Product name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Raspberry" required />
              </div>
              <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Category</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fruit" required />
              </div>
              <div className="mb-5">
                <label htmlFor="calories" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white weight">Calories (per 100g)</label>
                <input type="number" id="calories" name="calories" value={formData.calories ?? ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="25" required />
              </div>
              <div className="mb-5">
                <label htmlFor="proteins" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Proteins (per 100g)</label>
                <input type="number" id="proteins" name="proteins" value={formData.proteins ?? ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.8" required />
              </div>
              <div className="mb-5">
                <label htmlFor="fibers" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Fibers (per 100g)</label>
                <input type="number" id="fibers" name="fibers" value={formData.fibers ?? ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2.5" required />
              </div>
              <div className="mb-5">
                <label htmlFor="carbohydrates" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Carbohydrates (per 100g)</label>
                <input type="number" id="carbohydrates" name="carbohydrates" value={formData.carbohydrates ?? ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5" required />
              </div>
              <button type="submit" className="text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                  transition duration-100 ease-in-out hover:scale-95">Add product</button>
            </form>
            
            {successMessage && (
              <ToastNotification toastMessage={successMessage}/>
            )}

            {errorMessage && (
              <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                  </svg>
                  <span className="sr-only">Error icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{errorMessage}</div>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
