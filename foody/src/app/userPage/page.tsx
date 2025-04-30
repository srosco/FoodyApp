"use client";
import "../globals.css";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
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
  const { userData, logout } = useContext(UserContext) as any;

    if (!userData) {
      redirect('/login'); // Redirect to login if user is not logged in
    }

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
          </div>
        ) : (
          <p>Loading user data...</p> // Optional loading state or message
        )}
      </div>
    </div>
  );
}
