"use client"
import { useState } from "react";
import "../globals.css";
import fruitLogo from '../../assets/fruit-mosaique.jpg';
import Image from 'next/image';

export default function Page() {

  const [iconsCollapsed, setIconsCollapsed] = useState(true);

  function FruitIcon() {
    return (
      <div onClick={() => setIconsCollapsed(!iconsCollapsed)} data-twe-ripple-init
        data-twe-ripple-color="light">
        <Image
          src={fruitLogo}
          width={75}
          className='rounded-3xl max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer'
          alt="Picture of the App icon"
        />
      </div>
    );
  }

  function CollapsableIcon() {
    return (
      <div className={`${iconsCollapsed ? 'collapse' : 'visible'}`} data-twe-ripple-init
        data-twe-ripple-color="light">
        <Image
          src={fruitLogo}
          width={75}
          className='rounded-3xl max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer'
          alt="Picture of the App icon"
        />
      </div>
    );
  }
  return (
    <div>
       <div className='flex flex-grow flex-start justify-end p-5'>
          <FruitIcon/>
          <CollapsableIcon/>
        </div>
      <div>
        <div className="flex w-full gap-10 flex-row justify-between">
          <div className="flex flex-grow items-center">
            <h1 className="p-5 text-3xl font-bold">Calibration Page</h1>
          </div>

        </div>
        <div className='flex flex-col w-full gap-10'>

          <form className="max-w-sm mx-auto">
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
              <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jdoe@test.com" required />
            </div>
            <button type="submit" className="text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        transition duration-100 ease-in-out hover:scale-95">Submit</button>
          </form>
          {/* <button
        type="button"
        className="m-10 p-4 w-fit self-center bg-gradient-to-tr from-emerald-500 to-emerald-900 rounded 
        transition duration-100 ease-in-out hover:scale-95">
        Click here to get started
      </button> */}
        </div>

      </div>
    </div>
  );
}
