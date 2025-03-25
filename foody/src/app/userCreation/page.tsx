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
  const title: string = 'User Creation Page';
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission status
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods

  interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    aimed_maccros: number;
    cart_id: number;
    password: string;
  }

  const [formData, setFormData] = React.useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    aimed_maccros: 0.0,
    cart_id: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Replace comma with period to handle both formats
    const normalizedValue = value.replace(',', '.');

    // If the value should be a number, handle empty input and decimal numbers properly.
    const parsedValue = ['aimed_maccros', 'cart_id'].includes(name)
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
        `${process.env.NEXT_PUBLIC_API_USER}/create`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        aimed_maccros: 0.0,
        password: '',
        cart_id: 0
      });

      console.log('Form submitted successfully:', response.data);

      setSuccessMessage(`The user ${response.data.first_name} has been created successfully !`);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("An error occured during user creation");
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
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white weight">Email</label>
                <input type="text" id="email" name="email" value={formData.email ?? ''} onChange={handleChange} className="bg-gray-50 border cursor-default border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jdoe@test.com" required />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border cursor-default border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="mb-5">
                <label htmlFor="first_name" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">First name</label>
                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="bg-gray-50 border cursor-default border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </div>
              <div className="mb-5">
                <label htmlFor="last_name" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Last Name</label>
                <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="bg-gray-50 border cursor-default border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
              </div>
              <div className="mb-5">
                <label htmlFor="aimed_maccros" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Aimed Maccros</label>
                <input type="number" id="aimed_maccros" name="aimed_maccros" value={formData.aimed_maccros ?? ''} onChange={handleChange} className="bg-gray-50 border cursor-default border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2000" required />
              </div>
              <div className="mb-5">
                <label htmlFor="cart_id" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Cart ID</label>
                <input type="number" id="cart_id" name="cart_id" value={formData.cart_id ?? ''} onChange={handleChange} className="bg-gray-50 border cursor-default border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
              </div>
              <button type="submit" className="text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                  transition duration-100 ease-in-out hover:scale-95">Add user</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
