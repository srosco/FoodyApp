import "./globals.css";
import Link from 'next/link';
import React from "react";

const TextBlock = React.memo(({ textContent }: { textContent: string }) => {
  return (
    <div className='flex flex-col gap-10 flex-wrap justify-center content p-5'>
      <p className='font-bold gray-900'>{textContent}</p>
    </div>
  );
})

export default function Home() {

  const subtitle1: string = 'Make your life easier when it comes to calculating your daily maccros !';
  const subtitle2: string = 'Get your weekly goals done and see the results you truely deserve';

  return (
    <div>
      <div className="flex w-full gap-10 flex-row justify-between">
        <div className="flex flex-grow items-center">
          <h1 className="p-5 text-3xl font-bold">Welcome to Foody App !</h1>
        </div>

      </div>
      <div className='flex flex-col w-full'>
        <TextBlock textContent={subtitle1} />
        <TextBlock textContent={subtitle2} />
        <Link className="p-5 w-fit place-self-center bg-gradient-to-bl from-blue-900 to-fuchsia-500 bg-clip-text text-transparent font-bold
      max-w-xs transition duration-300 ease-in-out hover:scale-95 cursor-pointer" href="/login">Click here to get started</Link>
      </div>
    </div>
  );
}
