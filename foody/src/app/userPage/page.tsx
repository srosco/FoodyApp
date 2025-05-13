"use client";
import "../globals.css";
import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { redirect } from "next/navigation";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  aimed_maccros: number;
  aimed_carbohydrates: number;
  aimed_fibers: number;
  aimed_proteins: number;
  aimed_calories: number;
  current_maccros: number;
  cart_id: number;
};

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
  // const { userData, logout, loading } = useUserContext();
  const { userData, logout, loading } = useUserContext();

  useEffect(() => {
    if (loading) return;
    if (!userData) {
      redirect('/login'); // Redirect to login if user is not logged in
    }

  }, [userData, loading]);


  const title: string = 'User page';

  return (
    <div>
      <TitleOfPage title={title} />
      <div className='p-5 flex flex-col w-full gap-10'>
        {userData ? (
          <div>
            <div>Id: <strong>{userData.id}</strong></div>
            <div>First name: <strong>{userData.first_name}</strong></div>
            <div>Last name: <strong>{userData.last_name}</strong></div>
            <div>Email: <strong>{userData.email}</strong></div>
            <div>Aimed Carbohydrates: <strong>{userData.aimed_carbohydrates}</strong></div>
            <div>Aimed Fibers: <strong>{userData.aimed_fibers}</strong></div>
            <div>Aimed Proteins: <strong>{userData.aimed_proteins}</strong></div>
            <div>Aimed Calories: <strong>{userData.aimed_calories}</strong></div>
            <button
                onClick={logout}
                className="my-2 inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-br from-blue-500 to-red-200 rounded-lg hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Logout
            </button>
          </div>
        ) : (
          <p>Loading user data...</p> // Optional loading state or message
        )}
      </div>
    </div>
  );
}
