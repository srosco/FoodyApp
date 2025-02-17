import "../globals.css";
 
function TextBlock({ textContent }: { textContent: string }) {
  return (
    <div className='flex flex-col gap-10 flex-wrap justify-center content p-5 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent'>
      <p className='font-bold'>{textContent}</p>
    </div>
  );
}

export default function Page() {
  return (
  <div>
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">Dashboard Page</h1>
      </div>

    </div>
    <div className='flex flex-col w-full gap-10'>
      <TextBlock textContent="Calibration page" />

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
