'use client';

import axios from "axios";
import "../globals.css";
import React from "react";
import { useNotificationContext } from "../context/NotificationContext";

const TitleOfPage = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">{title}</h1>
      </div>
    </div>
  )
}

export default function Page() {
  const title: string = 'Product Creation Page';
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission status
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        `${process.env.NEXT_PUBLIC_API_PRODUCT}`,
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

      setSuccessMessage(`The ${response.data.name} has been created successfully!`);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("An error occured during product creation");
    }
  }

  return (
    <div>
      <div>
        <TitleOfPage title={title} />
        <div>
          <div className='p-5 flex flex-col w-full gap-10'>

            <form className="max-w-sm" onSubmit={handleProductCreation}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
