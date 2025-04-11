"use client";
import React, { useContext, useState } from "react";
import "../globals.css";
import { useNotificationContext } from "../context/NotificationContext";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [remember, setRemember] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission status
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods
  const { setToken, setUserData } = useContext(UserContext) as any;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOGIN}`,
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // console.log('response ===> ', response);
      
      if (response.status === 200) {
        // console.log('User Token :', response.data);
        const token = response.data;
        console.log('token :', token.token);
        localStorage.setItem('token', token.token);
        setToken(token);
        
        const responseUser = await axios.get(
          `${process.env.NEXT_PUBLIC_API_CURRENT_USER}`,
          {
            headers: { 'Authorization': `Bearer ${token.token}` },
          }
        );
        console.log('User data : ', responseUser.data);
        setUserData(responseUser.data);
      }

      else {
        setErrorMessage('Login failed. Please check your credentials.');
      }

      setSuccessMessage(`Successfully logged in`);
      router.push('/userPage'); // redirection here 

    } catch (err) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
    finally {
      setIsSubmitting(false);
    }
    // Handle form submission here
  };

  return (
    <div>
      <div>
        <div className="flex w-full gap-10 flex-row justify-between">
          <div className="flex flex-grow items-center">
            <h1 className="p-5 text-3xl font-bold">Login Page</h1>
          </div>
        </div>
        <div className='p-5 flex flex-col w-full gap-10'>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 cursor-default text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="jdoe@foody.com"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 cursor-default text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* <div className="flex items-start mb-5 ml-2">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <label
                htmlFor="remember"
                style={{ pointerEvents: 'none' }}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div> */}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
