"use client";
import React, { useContext, useEffect } from "react";
import "../globals.css";
import Link from "next/link";
import axios from "axios";
import InputField from "@/assets/InputField";
import EditModal from "@/assets/editModal";
import DeleteModal from "@/assets/deleteModal";
import LoginModal from "@/assets/loginModal";
import { useNotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
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

type Cart = {
    id: number;
    creation_date: string;
    name: string;
    total_calories: number;
    total_proteins: number;
    total_fibers: number;
    total_carbohydrates: number;
    carts: string[];
    user_id: number;
};

interface CardProps {
    cartId: number;
    cartName: string;
    cartDate: string;
    cartCalories: number;
    cartCarbohydrates: number;
    cartProteins: number;
    cartFibers: number;
    onEdit: () => void;
    onAssignToMe: () => void;
    redirectToCartProducts: () => void;
}

const Card: React.FC<CardProps> = ({ cartName, cartDate, cartCalories, cartCarbohydrates, cartFibers, cartProteins, cartId, onEdit, onAssignToMe, redirectToCartProducts }) => {
    return (
        <div className="max-w-sm p-6 shadow-2xl border-gray-800 rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-4 w-[450px] h-[360px] bg-gradient-to-br from-amber-400 to-lime-100">
            <h5 className="flex place-content-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><p>{cartName}</p> <p>ID: {cartId}</p> </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Calories : <strong>{cartCalories.toFixed(2)}</strong></p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Proteins : <strong>{cartProteins.toFixed(2)}</strong></p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Carbohydrates : <strong>{cartCarbohydrates.toFixed(2)}</strong></p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Fibers : <strong>{cartFibers.toFixed(2)}</strong></p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Created at : <strong>{cartDate}</strong></p>
            <button
                onClick={redirectToCartProducts}
                className="my-2 inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-br from-blue-500 to-red-200 rounded-lg hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Manage products inside the cart
            </button>
            <div className="flex place-content-between">
                <button
                    onClick={onAssignToMe}
                    className="inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-br from-red-500 to-yellow-400 rounded-lg hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Link this card to my profile
                </button>
                <button
                    onClick={onEdit}
                    className="inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-br from-teal-500 to-lime-400 rounded-lg hover:opacity-80 dark:bg-blue-600 dark:hover:opacity-80 dark:focus:opacity-80"
                >
                    Edit the Cart
                </button>
            </div>
        </div>
    );
};

export default function Page() {
    const [cartList, setCartsList] = React.useState<Cart[]>([]);
    const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods
    const { userData, logout } = useContext(UserContext) as any;
    const [actionAfterLogin, setActionAfterLogin] = React.useState("");  // Delete Modal state here
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);  // Delete Modal state here
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);  // Delete Modal state here
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // Edit Modal state here
    const [selectedCart, setSelectedCart] = React.useState<Cart | null>(null); // Store cart to delete
    const router = useRouter();

    const getCartsList = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_CART_LIST}`);

            setCartsList(response.data);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const handleOpenEditModal = (cart: Cart) => {
        if (userData) {
            setSelectedCart(cart); // Store cart to delete
            setIsEditModalOpen(true); // Open modal
        }
        else {
            setActionAfterLogin("cart");
            setIsLoginModalOpen(true);
            setSelectedCart(cart);
        }
    };

    const handleRedirectionToCart = (cart: Cart) => {
        if (userData) {
            router.push(`/cart/${cart.id}`);
        }
        else {
            setActionAfterLogin("products");
            setSelectedCart(cart);
            setIsLoginModalOpen(true);
        }
    };

    const deleteCart = async (selectedCart: Cart) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_CART}/${selectedCart.id}`
            );
            setSuccessMessage(`The ${selectedCart.name} has been deleted.`);
            console.log("Cart deleted successfully !");
            getCartsList(); // Refresh the cart list
            setIsDeleteModalOpen(false); // Close the modal
        } catch (error) {
            setSuccessMessage(`Error deleting the cart : ${error}`)
            console.error('Error deleting cart:', error);
        }
    };

    const handleEditCart = async (updatedCart: Cart) => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CART}/${updatedCart.id}`,
                updatedCart,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            setSuccessMessage(`The ${response.data.name} has been edited !`);
            getCartsList(); // Refresh cart list after edit
            setIsEditModalOpen(false); // Close modal after success
        } catch (error) {
            setErrorMessage('Failed to edit the cart');
            console.error('Error editing cart:', error);
        }
    };

    const handleAssignCartToMe = async (updatedCart: Cart) => {
        if (userData) {
            setIsLoginModalOpen(false);
            updatedCart.user_id = userData.id;
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_CART}/${updatedCart.id}`,
                    updatedCart,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                setSuccessMessage(`The ${response.data.name} has been assigned to you !`);
                getCartsList(); // Refresh cart list after edit
            } catch (error) {
                setErrorMessage('Failed to edit the cart');
                console.error('Error editing cart:', error);
            }
        }
        else {
            setActionAfterLogin("assign");
            setSelectedCart(updatedCart);
            setIsLoginModalOpen(true);
        }
    };

    const handleCancel = () => {
        isDeleteModalOpen && setIsDeleteModalOpen(false); // Close Delete modal
        isEditModalOpen && setIsEditModalOpen(false); // Close Edit modal
        isLoginModalOpen && setIsLoginModalOpen(false); // Close Login modal
    };


    const handleActionOnceLogged = (cart: Cart) => {
        // Close modal before performing action
        setTimeout(() => {
            if (actionAfterLogin === "products") {
                router.push(`/cart/${cart.id}`);
                setActionAfterLogin(""); // Reset action
            }
            else if (actionAfterLogin === "cart" && !isEditModalOpen) {
                isLoginModalOpen && setIsLoginModalOpen(false);
                setSelectedCart(cart); // Store cart to delete
                setIsEditModalOpen(true);
                setActionAfterLogin(""); // Reset action
            }
        }, 300); // Delay for a short time to allow modal to close first
    };

    const title: string = 'Cart List';

    useEffect(() => {
        getCartsList();
        if (isLoginModalOpen === false && userData && selectedCart && actionAfterLogin === "cart") {
            setIsEditModalOpen(true);
        }
        if (userData && selectedCart && actionAfterLogin === "assign") {
            handleAssignCartToMe(selectedCart);
        }
    }, [isLoginModalOpen, userData, selectedCart, actionAfterLogin]);


    return (
        <div className="flex-col">
            <TitleOfPage title={title} />
            <div className="flex gap-4 flex-col" style={{ maxWidth: 'calc(100vw - 18em)' }}>
                <div className="p-5 sm:rounded-lg gap-4 flex flex-wrap flex-col md:flex-row max-h-[calc(100vh-15em)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:hover:cursor-pointer [&::-webkit-scrollbar-track]:bg-gray-100   [&::-webkit-scrollbar-thumb]:bg-gray-300   dark:[&::-webkit-scrollbar-track]:bg-neutral-700   dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-[5px]">
                    {cartList && cartList.map((cart) => {
                        return (
                            <Card redirectToCartProducts={() => handleRedirectionToCart(cart)} onAssignToMe={() => handleAssignCartToMe(cart)} onEdit={() => handleOpenEditModal(cart)} cartId={cart.id} cartName={cart.name} cartDate={cart.creation_date} cartCalories={cart.total_calories} cartProteins={cart.total_proteins} cartFibers={cart.total_fibers} cartCarbohydrates={cart.total_carbohydrates} key={cart.id} />
                        )
                    })}
                </div>
                <div>
                    <Link href="/cartCreation">
                        <button type="button" className="text-gray-900 dark:text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                transition duration-100 ease-in-out hover:scale-95">Add a cart</button>
                    </Link>
                </div>
                {isEditModalOpen && selectedCart && (
                    <EditModal
                        isOpen={isEditModalOpen}
                        title={`Edit the cart ${selectedCart.name}`}
                        initialValues={selectedCart}
                        submitLabel="Modify the cart"
                        onCancel={handleCancel}
                        onSubmit={(updatedCart) => handleEditCart(updatedCart)}
                    >
                        <InputField
                            label="name"
                            value={selectedCart.name}
                            onChange={(value) => setSelectedCart({ ...selectedCart, name: value })}
                            type="text"
                        />
                        <InputField
                            label="user_id"
                            customLabel="ID of the linked user"
                            value={selectedCart.user_id}
                            onChange={(value) => setSelectedCart({ ...selectedCart, user_id: value })}
                            type="number"
                        />
                    </EditModal>
                )}
                {isDeleteModalOpen && selectedCart && userData && (
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        title="Delete Cart"
                        message={`Are you sure you want to delete the cart ${selectedCart.name}?`}
                        onSubmit={() => deleteCart(selectedCart)}
                        onCancel={handleCancel}
                    />
                )}
                {isLoginModalOpen && selectedCart && (
                    <LoginModal
                        isOpen={isLoginModalOpen}
                        onCancel={handleCancel}
                        onSuccess={() => handleActionOnceLogged(selectedCart)}
                    />
                )}
            </div>
        </div>
    );
}
