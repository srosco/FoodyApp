"use client";
import axios from "axios";
import "../globals.css";
import React, { useEffect } from "react";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  aimed_maccros: number;
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
  const [user, setUser] = React.useState<User>();

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_USER}/${1}`);

      console.log('User infos loaded successfully :', response.data);
      setUser(response.data);

    } catch (error) {
      console.error('Error getting user :', error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const title: string = 'User page';

  return (
    <div>
      <TitleOfPage title={title} />
      <div className='p-5 flex flex-col w-full gap-10'>
        {user && (
          <div>
            <div>Id : <strong>{user.id}</strong></div>
            <div>First name : <strong>{user.first_name}</strong></div>
            <div>Last name : <strong>{user.last_name}</strong></div>
            <div>Email : <strong>{user.email}</strong></div>
            <div>Current Maccros : <strong>{user.current_maccros}</strong></div>
            <div>Aimed Maccros : <strong>{user.aimed_maccros}</strong></div>
          </div>
        )}
      </div>
    </div>
  );
}
