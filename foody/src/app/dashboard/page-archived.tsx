import "../globals.css";
    

const TitleOfPage = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">{title}</h1>
      </div>
    </div>
  )
}

const ProductRow = ({ productName, productCategory, productCalories, productGrams }: { productName: string, productCategory: string, productCalories: string, productGrams: string }) => {

  return (
    <tr className="tr-class transform transition-transform duration-300 ease-in-out sm:hover:scale-105 hover:scale-95 bg-blue-500 rounded-lg">
      <td className="td-class">{productName}</td>
      <td className="td-class">{productCategory}</td>
      <td className="td-class">{productCalories}</td>
      <td className="td-class">{productGrams}</td>
      <td className="td-class">
        <span className="float-right rounded-md bg-green-500/50 px-4 py-px text-xs font-semibold uppercase text-green-600 antialiased">Healthy</span>
      </td>
    </tr>
  )
}

export default function Page() {
  const title: string = 'Dashboard';

  const productName: string = 'Banana';
  const productCategory: string = 'Fruit';
  const productCalories: string = '80';
  const productGrams: string = '100g';

  return (
    <div>
      <div>
        <TitleOfPage title={title} />
        <div>
          <div className="max-h-[75vh] overflow-y-scroll [&::-webkit-scrollbar]:w-2
                       [&::-webkit-scrollbar-track]:bg-gray-100
                       [&::-webkit-scrollbar-thumb]:bg-gray-300
                       dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                       dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-[5px]">
            <table className="text-sm border-separate border-spacing-y-2 md:mt-0 sm:p-6 w-full">
              <thead className="sr-only">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto max-h-[75vh]'>
                {/* <tr className="tr-class transform transition-transform duration-300 ease-in-out sm:hover:scale-105 hover:scale-95 bg-blue-500 rounded-lg">
                  <td className="td-class">Peregrin Took</td>
                  <td className="td-class">pippin@mail.com</td>
                  <td className="td-class">Fellowship of the Ring</td>
                  <td className="td-class">
                    <span className="float-right rounded-md bg-green-600/50 px-4 py-px text-xs font-semibold uppercase text-green-900 antialiased">Active</span>
                  </td>
                </tr> */}

                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Apple' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Rasberry' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Watermelon' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Apple' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Rasberry' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Watermelon' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Apple' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Rasberry' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Watermelon' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Apple' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Rasberry' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Watermelon' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Apple' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Rasberry' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Watermelon' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName={productName} productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Apple' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Rasberry' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
                <ProductRow productName='Watermelon' productCategory={productCategory} productCalories={productCalories} productGrams={productGrams} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
