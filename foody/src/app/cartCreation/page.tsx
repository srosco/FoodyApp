'use client';

import axios from "axios";
import "../globals.css";
import React, { useContext, useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { UserContext, useUserContext } from "../context/UserContext";
import LoginModal from "@/assets/loginModal";
import { useRouter } from "next/navigation";

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
  const title: string = 'Cart Creation Page';
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission status
  const { userData, logout, loading } = useUserContext();
  const [actionAfterLogin, setActionAfterLogin] = React.useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods
  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([]);
  const [productList, setProductList] = React.useState<Product[]>([]);
  const router = useRouter();


  const getCartProductsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PRODUCT}`);

      setProductList(response.data);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!userData) {
      setIsLoginModalOpen(true);
    }
    else {
      getCartProductsList();
    }
  }, [userData, loading])

  type Product = {
    id: number;
    name: string;
    category: string;
    calories: number;
    proteins: number;
    fibers: number;
    carbohydrates: number;
    quantity_in_grams: number;
    checked: boolean;
  };

  type ProductId = {
    id: number;
  };

  interface FormData {
    name: string;
    creation_date: string;
    user_id: number;
    products: ProductId[];
  }

  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    creation_date: '',
    user_id: 0,
    products: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Replace comma with period to handle both formats
    const normalizedValue = value.replace(',', '.');

    // If the value should be a number, handle empty input and decimal numbers properly.
    const parsedValue = ['calories', 'proteins', 'fibers', 'carbohydrates'].includes(name)
      ? normalizedValue === '' ? null : parseFloat(normalizedValue) // Handle empty as null
      : normalizedValue;

    // Set the state with the parsed value
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue, // Update the value for the corresponding field
    }));
  };

  const handleCancel = () => {
    isLoginModalOpen && setIsLoginModalOpen(false); // Close Login modal
  };


  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  const handleProductCreation = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setIsSubmitting(true);
    const todayFormatted = formatDate(new Date());
    const products: ProductId[] = selectedProducts.map(product => ({ id: product.id }));
    formData.creation_date = todayFormatted;
    formData.products = products;
    formData.user_id = userData.id;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_CART}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      setFormData({
        name: '',
        creation_date: '',
        user_id: 0,
        products: [],
      });

      console.log('Form submitted successfully:', response.data);

      setSuccessMessage(`The ${response.data.name} has been created successfully!`);
      router.push(`/cartList`);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("An error occured during product creation");
    }
  }

  const DropdownSearch: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const toggleDropdown = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent the button from closing the dropdown
      setIsOpen(prev => !prev);
    };

    const handleCheckboxChange = (product: Product, isChecked: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation(); // Prevent click event from bubbling up to the button
      setSelectedProducts(prev =>
        isChecked
          ? [...prev, product]
          : prev.filter(p => p.id !== product.id)
      );
    };

    const isProductChecked = (id: number) => selectedProducts.some(p => p.id === id);

    return (
      <div className="relative inline-block">
        {/* Dropdown Toggle Button */}
        <button
          id="dropdownSearchButton"
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add products
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            id="dropdownSearch"
            className="absolute z-10 mt-2 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
          >
            <div className="p-1">
              {/* Search Input or other content */}
            </div>
            <ul
              className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              {productList && productList.map(product => (
                <li key={product.id}>
                  <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={`checkbox-item-${product.id}`}
                      type="checkbox"
                      checked={isProductChecked(product.id)}
                      onChange={e => handleCheckboxChange(product, e.target.checked, e)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item-${product.id}`}
                      className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                    >
                      {product.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center p-1 text-sm font-medium border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onCancel={handleCancel}
          onSuccess={() => handleCancel()}
        />
      )}
      <div>
        <TitleOfPage title={title} />
        {userData ? (
          <div>
            <div className='p-5 flex flex-col w-full gap-10'>

              <form className="max-w-sm" onSubmit={handleProductCreation}>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Cart name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cart 1" required />
                </div>
                <div className="mb-5">
                  <DropdownSearch />
                </div>
                {selectedProducts.length > 0 &&
                  <div className="mb-5">
                    <strong>Products that will be added :</strong>
                  </div>
                }
                {selectedProducts && selectedProducts.map(product => {
                  return (
                    <div key={product.id} className="mb-2">
                      {/* <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{product.name}</label>  */}
                      <label htmlFor="product_quantity" className="block mb-2 text-sm text-gray-900 dark:text-white"><strong>- {product.name}</strong></label>

                    </div>
                  )
                })}
                <button type="submit" className="text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                  transition duration-100 ease-in-out hover:scale-95">Create Cart</button>
              </form>
            </div>
          </div>
        ) : (
          <div>Connection is required to perform some actions here</div>
        )}

      </div>
    </div>
  );
}