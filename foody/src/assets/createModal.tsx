import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContext, useUserContext } from '@/app/context/UserContext';
import { useNotificationContext } from '@/app/context/NotificationContext';

type Product = {
  id: number;
  name: string;
  category: string;
  calories: number;
  proteins: number;
  fibers: number;
  carbohydrates: number;
  quantity_in_grams: number;
};

interface CreateModalProps<T> {
  initialValues: T;
  isOpen: boolean;
  submitLabel: string;
  title: string;
  onCancel: () => void;
  getCartProductsList: () => void;
  // onSubmit: (updatedData: T) => void;
  currentProductList: Product[];
  cartId: number | undefined;
}

interface ProductsToAddProps {
  productId: number;
  productName: string;
  productCategory: string;
  productCalories: number;
  productCarbohydrates: number;
  productProteins: number;
  productFibers: number;
  productQty: number;
  addProductToCart: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  quantity_in_grams: number;
}



const ProductsToAdd: React.FC<ProductsToAddProps> = ({ handleChange, addProductToCart, productName, productCalories, productCarbohydrates, productFibers, productProteins, productQty, productCategory }) => {
  return (
    <div className="max-w-sm p-6 shadow-inner border-gray-800 rounded-lg dark:bg-gray-800 dark:border-gray-700 w-[290px] h-[380px] bg-gradient-to-bl from-lime-200 to-red-400">
      <h5 className="flex place-content-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><p>{productName}</p>
        <div className="flex items-start">
          <button onClick={addProductToCart} type="button" className="text-red-500 hover:opacity-70"><FontAwesomeIcon icon={faCartPlus} /></button>
        </div>
      </h5>
      <div className="flex flex-col">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Category : <strong>{productCategory}</strong></p>
        <div className="rounded-lg border border-gray-500 pl-4 pt-2">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Maccros <strong>per 100 g :</strong></p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Calories : <strong>{productCalories}</strong></p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Proteins : <strong>{productProteins}</strong></p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Carbohydrates : <strong>{productCarbohydrates}</strong></p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fibers : <strong>{productFibers}</strong></p>
        </div>
        <div className="mb-5">
          <label htmlFor="quantity_in_grams" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Quantity (per 100g)</label>
          {/* <input type="number" step="0.1" id="quantity_in_grams" name="quantity_in_grams" value={productQty ?? ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5" required /> */}
          <input
            type="number"
            step="0.1"
            id="quantity_in_grams"
            name="quantity_in_grams"
            value={
              typeof productQty === 'number' && productQty !== 0
                ? String(productQty).replace(/^0+(\d)/, '$1')
                : ''
            }
            onChange={handleChange}
            className=" cursor-default bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>
      </div>
    </div>
  );
};

const CartModal: React.FC<CreateModalProps<any>> = ({ cartId, isOpen, title, onCancel, initialValues, submitLabel, currentProductList, getCartProductsList }) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods
  const [formData, setFormData] = React.useState<FormData>({
    quantity_in_grams: 0.0
  });
  const { userData, logout, loading } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const { name, value } = e.target;
    const normalizedValue = value.replace(',', '.');
  
    setProductList(prevList =>
      prevList.map(product =>
        product.id === productId
          ? {
              ...product,
              [name]:
                normalizedValue === '' ? '' : isNaN(Number(normalizedValue)) ? product[name as keyof Product] : parseFloat(normalizedValue),
            }
          : product
      )
    );
  };

  const addProductToCart = async (selectedProduct: Product) => {
    console.log('selectedProduct ===> ', selectedProduct);
    const formedData = {
      id: selectedProduct.id,
      quantity_in_grams: selectedProduct.quantity_in_grams
    }
    console.log('formedData ===> ', formedData);
    // if (userData) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_CART}/${cartId}/products`,
          [formedData],
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setSuccessMessage(`The ${selectedProduct.name} has been added from the cart ${cartId}.`);
        console.log("Product added successfully !");
        getCartProductsList(); // Refresh the product list
        onCancel(); // Close the modal
      } catch (error) {
        setSuccessMessage(`Error adding the product : ${error}`)
        console.error('Error adding product:', error);
      }
    // }
  };

  const getProductList = async () => {
    try {
      const allProducts = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PRODUCT}`);

      const selectedIds = new Set(currentProductList.map((item: Product) => item.id));
      const filteredList = allProducts.data.filter((item: Product) => !selectedIds.has(item.id));
      console.log('List filtered ===> ', filteredList);
      setProductList(filteredList);


    } catch (error) {
      console.error('Error while fetching all products:', error);
    }
  }

  useEffect(() => {
    setFormData(initialValues);
    getProductList();
  }, [isOpen, initialValues]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  };

  if (!isOpen) return null;
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="w-screen flex fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 max-w-[60em] max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="p-4 w-full max-h-[calc(100vh-30em)]" style={{ maxWidth: 'calc(100vw - 18em)' }}>
        <div className="relative bg-purple-200 rounded-lg shadow-sm dark:bg-gray-700 flex flex-wrap">

          {/* Modal Content */}
          <div className="p-4 md:p-5 flex flex-col">
            <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400"><strong>{title}</strong></h3>
            <div className='p-5 sm:rounded-lg gap-4 flex flex-wrap flex-col md:flex-row max-h-[calc(100vh-15em)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:hover:cursor-pointer [&::-webkit-scrollbar-track]:bg-gray-100   [&::-webkit-scrollbar-thumb]:bg-gray-300   dark:[&::-webkit-scrollbar-track]:bg-neutral-700   dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-[5px]'>
              {productList && productList.map((product) => {
                return (
                  <ProductsToAdd handleChange={(e) => handleChange(e, product.id)} addProductToCart={() => addProductToCart(product)}  productQty={product.quantity_in_grams} productId={product.id} productCategory={product.category} productName={product.name} productCalories={product.calories} productProteins={product.proteins} productFibers={product.fibers} productCarbohydrates={product.carbohydrates} key={product.id} />
                )
              })}
            </div>
            <button
        type="button"
        onClick={onCancel}
        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Cancel
      </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartModal;
