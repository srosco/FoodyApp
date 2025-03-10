import "../globals.css";

export default function Page() {

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
}
