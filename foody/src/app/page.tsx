import "./globals.css";
import Link from 'next/link';

function TextBlock({ textContent }: { textContent: string }) {
  return (
    <div className='flex flex-col gap-10 flex-wrap justify-center content p-5'>
      <p className='font-bold gray-900'>{textContent}</p>
    </div>
  );
}

export default function Home() {

  return (
  <div>
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">Welcome to Foody App !</h1>
      </div>

    </div>
    <div className='flex flex-col w-full'>
      <TextBlock textContent="Make your life easier when it comes to calculating your daily maccros !" />
      <TextBlock textContent="Get your weekly goals done and see the results you truely deserve" />
      <Link className="p-5 w-fit place-self-center bg-gradient-to-bl from-blue-900 to-fuchsia-500 bg-clip-text text-transparent font-bold
      max-w-xs transition duration-300 ease-in-out hover:scale-95 cursor-pointer" href="/calibration">Click here to get started</Link>
      {/* <button
        type="button"        
        className="m-10 p-4 w-fit self-center bg-gradient-to-tr from-emerald-500 to-emerald-900 rounded 
        transition duration-100 ease-in-out hover:scale-95">
        Click here to get started
      </button> */}
    </div>
    
  </div>
  );
}
