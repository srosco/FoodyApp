"use client";
import React, { useEffect } from "react";
import "../globals.css";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from "@/assets/modal";

const TitleOfPage = ({ title }: { title: string }) => {
    return (
        <div className="flex w-full gap-10 flex-row justify-between">
            <div className="flex flex-grow items-center">
                <h1 className="p-5 text-3xl font-bold">{title}</h1>
            </div>
        </div>
    )
}

type Product = {
    id: number;
    name: string;
    category: string;
    calories: number;
    proteins: number;
    fibers: number;
    carbohydrates: number;
};

type ProductRowProps = {
    productId: number;
    productName: string;
    productCategory: string;
    productCalories: number;
    productProteins: number;
    productCarbohydrates: number;
    productFibers: number;
    index: number;
    getProductList: () => void; // Passing getProductList function here
};



const ProductRow: React.FC<ProductRowProps> = ({ getProductList, productId, productName, productCategory, productCalories, productProteins, productCarbohydrates, productFibers, index }) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
    const deleteProduct = async (productId: number) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_PRODUCT_LIST}/${productId}`);

            console.log("SUCCESS ! ");
            getProductList();
            // setProductList(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const handleDeletion = (productName: string, productId: number) => {
        // Handle deactivation logic
        deleteProduct(productId);
        console.log("The product", productName, "with an id of", productId,"has been deleted .");
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        // Handle cancel logic
        console.log("Action cancelled.");
        setIsModalOpen(false);
      };
    
      const closeModal = () => {
        // Close modal logic
        setIsModalOpen(false);
      };

    return (
        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productName}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productCategory}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productCalories}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productProteins}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productFibers}</td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productCarbohydrates}</td>
            <td scope="col" className="px-6 py-3 gap-1">
                <button  type="button" className="mr-5 hover:text-gray-900"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={() => setIsModalOpen(true)} data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="hover:text-gray-900"><FontAwesomeIcon icon={faTrash} /></button>
                
                {isModalOpen && (
                    <Modal  
                        isOpen={isModalOpen}
                        title="Delete Product"
                        message={`Are you sure you want to delete the product ${productName} ?`}
                        onSubmit={() => handleDeletion(productName, productId)}
                        onCancel={handleCancel}
                    />
                )}
            </td>

            {/* <td className="td-class">
                <span className="float-right rounded-md bg-green-500/50 px-4 py-px text-xs font-semibold uppercase text-green-600 antialiased">Healthy</span>
                </td> */}
        </tr>
    )
}

export default function Page() {
    const [productList, setProductList] = React.useState<Product[]>([]);

    const title: string = 'Product List';

    const getProductsList = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_PRODUCT_LIST}`);

            console.log('Product List loaded successfully :', response.data);
            setProductList(response.data);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    useEffect(() => {
        getProductsList();
    }, []);

    return (
        // <div className={`${isModalOpen}`}>
        <div>
            <div className="min-w-full">
                <TitleOfPage title={title} />
                <div className="flex min-w-full gap-4 flex-col">
                    <div className="relative overflow-x-auto min-w-full shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gradient-to-tl from-amber-500 to-yellow-400 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Calories
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Proteins
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Fibers
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Carbohydrates
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Actions
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {productList && productList.map((product) => {
                                    return (
                                        <ProductRow getProductList={getProductsList} productId={product.id} productName={product.name} productCategory={product.category} productCalories={product.calories} productProteins={product.proteins} productFibers={product.fibers} productCarbohydrates={product.carbohydrates} key={product.id} index={product.id} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Link href="/products">
                            <button type="button" className="text-gray-900 dark:text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            transition duration-100 ease-in-out hover:scale-95">Add a product</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
