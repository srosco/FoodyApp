"use client";
import React, { useContext, useState } from 'react';
import '../app/globals.css';
import { useNotificationContext } from '@/app/context/NotificationContext';
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onCancel, onSuccess }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission status
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods
  const { setToken, userData, setUserData } = useContext(UserContext) as any;
  const router = useRouter();

  const redirectToCreationPage = () => {
    router.push('/userCreation');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    if (!!email && !!password) {
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
        onSuccess();
  
      } catch (err) {
        setErrorMessage('Login failed. Please check your credentials.');
      }
      finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="w-screen flex fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <button
            type="button"
            className="absolute left-2 top-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onCancel}
          >
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
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                You have to be connected
              </h3>
              <button onClick={onCancel} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
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
                    className="bg-gray-50 border border-gray-300 cursor-default text-gray-900 text-sm rounded-lg focus:ring-rose-500 [&&]:focus:!border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-rose-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500"
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
                    className="bg-gray-50 border border-gray-300 focus:border-gray-500 cursor-default text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div className='flex place-content-between items-center'>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-white bg-gradient-to-r from-indigo-500 to-purple-200 hover:opacity-80 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:opacity-80 dark:focus:opacity-80"
                  >
                    Login
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <a href="#" className="bg-gradient-to-br from-rose-500 to-pink-500 bg-clip-text hover:opacity-80 dark:hover:opacity-80 dark:focus:opacity-80  text-transparent" onClick={redirectToCreationPage}>Create account</a>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
