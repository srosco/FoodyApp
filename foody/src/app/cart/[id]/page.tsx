"use client";
import React, { useContext, useEffect } from "react";
import "../../globals.css";
import axios from "axios";
import InputField from "@/assets/InputField";
import EditModal from "@/assets/editModal";
import CreateModal from "@/assets/createModal";
import DeleteModal from "@/assets/deleteModal";
import LoginModal from "@/assets/loginModal";
import { useNotificationContext } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from 'next/navigation';
import { faPen, faTrash, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    products: Product[];
    user_id: number;
};

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

interface CartProductProps {
    productId: number;
    productName: string;
    productCategory: string;
    productCalories: number;
    productCarbohydrates: number;
    productProteins: number;
    productFibers: number;
    productQty: number;
    onEdit: () => void;
    onDelete: () => void;
}

const CartProduct: React.FC<CartProductProps> = ({ productName, productCalories, productCarbohydrates, productFibers, productProteins, productQty, productCategory, onEdit, onDelete }) => {
    return (
        <div className="max-w-sm p-6 shadow-inner border-gray-800 rounded-lg dark:bg-gray-800 dark:border-gray-700 w-[290px] h-[350px] bg-gradient-to-bl from-lime-200 to-purple-400">
            {/* <h5 className="flex place-content-between text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><p>{productName}</p></h5> */}
            <h5 className="flex place-content-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><p>{productName}</p>
                <div className="flex items-start">
                    <button onClick={onEdit} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="mr-5 text-blue-500 hover:opacity-70"><FontAwesomeIcon icon={faPen} /></button>
                    <button onClick={onDelete} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-red-500 hover:opacity-70"><FontAwesomeIcon icon={faTrash} /></button>
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
                <p className="mb-3 mt-3 font-normal text-gray-700 dark:text-gray-400">Quantity : <strong>{productQty} g</strong></p>
            </div>
        </div>
    );
};

export default function Page() {
    const [productList, setProductList] = React.useState<Product[]>([]);
    const [cart, setCart] = React.useState<Cart>();
    const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods
    const { userData, logout } = useContext(UserContext) as any;
    const [actionAfterLogin, setActionAfterLogin] = React.useState("");  // Delete Modal state here
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);  // Delete Modal state here
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);  // Delete Modal state here
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);  // Delete Modal state here
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // Edit Modal state here
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null); // Store product to delete
    const [quantity, setQuantity] = React.useState<number>(Number(selectedProduct?.quantity_in_grams));
    const params = useParams();

    const getCartProductsList = async () => {
        if (params.id) {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_CART}/${params.id}`);

                setProductList(response.data.products);
                setCart(response.data);

            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    }

    useEffect(() => {
        if (params.id) {
            getCartProductsList();
        }
    }, [params]);

    const handleOpenEditModal = (product: Product) => {
        if (userData) {
            setSelectedProduct(product); // Store product to delete
            setIsEditModalOpen(true); // Open modal
        }
        else {
            setActionAfterLogin("product");
            setIsLoginModalOpen(true);
            setSelectedProduct(product);
        }
    };

    const handleOpenDeleteModal = (product: Product) => {
        if (userData) {
            setSelectedProduct(product); // Store product to delete
            setIsDeleteModalOpen(true); // Open modal
        }
        else {
            setActionAfterLogin("delete");
            setIsLoginModalOpen(true);
            setSelectedProduct(product);
        }
    };

    const handleOpenCreateModal = () => {
        console.log(userData);
        console.log(userData);
        if (userData) {
            setIsCreateModalOpen(true); // Open modal
        }
        else {
            setActionAfterLogin("create");
            setIsLoginModalOpen(true);
        }
    };

    const deleteProductOfCart = async (selectedProduct: Product) => {
        if (userData) {
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_CART}/${cart?.id}/products`,
                    {
                        data: [selectedProduct.id],
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setSuccessMessage(`The ${selectedProduct.name} has been deleted from the cart ${cart?.id}.`);
                console.log("Product deleted successfully !");
                getCartProductsList(); // Refresh the product list
                setIsDeleteModalOpen(false); // Close the modal
            } catch (error) {
                setSuccessMessage(`Error deleting the product : ${error}`)
                console.error('Error deleting product:', error);
            }
        }
        else {
            setActionAfterLogin("delete");
            setIsLoginModalOpen(true);
            setSelectedProduct(selectedProduct);
        }
    };

    const handleEditCart = async (updatedProduct: Product) => {
        if (cart && cart.products) {
            const updatedProducts = cart.products.map((product) => {
                if (product.id === updatedProduct.id) {
                    return { ...product, quantity_in_grams: updatedProduct.quantity_in_grams };
                }
                return product;
            });

            // Update the cart state with the updated products
            setCart({
                ...cart,
                products: updatedProducts, // Make sure products is never undefined
            });

            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_CART}/${cart?.id}`,
                    { ...cart, products: updatedProducts }, // Send the full cart with updated product
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                setSuccessMessage(`The ${response.data.name} has been edited!`);
                getCartProductsList();
                setIsEditModalOpen(false);
            } catch (error) {
                setErrorMessage('Failed to edit the product');
                console.error('Error editing product:', error);
            }
        } else {
            console.error("Cart or products are undefined");
        }
    };

    const handleCancel = () => {
        isDeleteModalOpen && setIsDeleteModalOpen(false); // Close Delete modal
        isEditModalOpen && setIsEditModalOpen(false); // Close Edit modal
        isLoginModalOpen && setIsLoginModalOpen(false); // Close Login modal
        isCreateModalOpen && setIsCreateModalOpen(false); // Close Login modal
    };

    const handleActionOnceLogged = (product?: Product) => {
        // Close modal before performing action
        setTimeout(() => {
            if (actionAfterLogin === "products") {
                // router.push(`/product/${product.id}`);
                setActionAfterLogin(""); // Reset action
            }
            else if (actionAfterLogin === "product" && !isEditModalOpen) {
                isLoginModalOpen && setIsLoginModalOpen(false);
                product && setSelectedProduct(product); // Store product to delete
                setIsEditModalOpen(true);
                setActionAfterLogin(""); // Reset action
            }
            else if (actionAfterLogin === "delete" && !isDeleteModalOpen) {
                isLoginModalOpen && setIsLoginModalOpen(false);
                product && setSelectedProduct(product); // Store product to delete
                setIsDeleteModalOpen(true);
                setActionAfterLogin(""); // Reset action
            }
            else if (actionAfterLogin === "create" && !isCreateModalOpen) {
                isLoginModalOpen && setIsLoginModalOpen(false);
                setIsCreateModalOpen(true);
                setActionAfterLogin(""); // Reset action
            }
        }, 300); // Delay for a short time to allow modal to close first
    };

    const title: string = `Product List of the Cart Number ${params.id}`;

    // const quantity = Number(selectedProduct?.quantity_in_grams);
    const carbs = Number(selectedProduct?.carbohydrates);
    const calculatedCarbs = (!isNaN(quantity) && !isNaN(carbs))
        ? ((carbs * quantity) / 100).toFixed(2)
        : "0.00";

    return (
        <div className="flex-col">
            <TitleOfPage title={title} />
            <div className="flex gap-4 flex-col" style={{ maxWidth: 'calc(100vw - 18em)' }}>
                <div className="p-5 sm:rounded-lg gap-4 flex flex-wrap flex-col md:flex-row max-h-[calc(100vh-15em)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:hover:cursor-pointer [&::-webkit-scrollbar-track]:bg-gray-100   [&::-webkit-scrollbar-thumb]:bg-gray-300   dark:[&::-webkit-scrollbar-track]:bg-neutral-700   dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-[5px]">
                    {productList && productList.map((product) => {
                        return (
                            <CartProduct onDelete={() => handleOpenDeleteModal(product)} onEdit={() => handleOpenEditModal(product)} productQty={product.quantity_in_grams} productId={product.id} productCategory={product.category} productName={product.name} productCalories={product.calories} productProteins={product.proteins} productFibers={product.fibers} productCarbohydrates={product.carbohydrates} key={product.id} />
                        )
                    })}
                    <div className="max-w-sm p-6 shadow-inner border-gray-800 rounded-lg dark:bg-gray-800 dark:border-gray-700 w-[290px] h-[350px] bg-gradient-to-bl from-yellow-400 to-red-600">
                        <div className="flex justify-center items-center h-[300px]">
                            <button onClick={() => handleOpenCreateModal()} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-6xl p-6 rounded-full text-lime-500 hover:opacity-70"><FontAwesomeIcon icon={faCartPlus} /></button>
                            <p className="text-lime-200"><strong>New Product</strong></p>
                        </div>
                    </div>
                    
                </div>
                {isEditModalOpen && selectedProduct && (
                    <EditModal
                        isOpen={isEditModalOpen}
                        title={`Edit the quantity of ${selectedProduct.name}`}
                        initialValues={selectedProduct}
                        submitLabel="Change the quantity"
                        onCancel={handleCancel}
                        onSubmit={(updatedCartProducts) => handleEditCart(updatedCartProducts)}
                    >
                        <InputField
                            label="calories"
                            value={selectedProduct.calories}
                            onChange={() => {}}
                            type="text"
                            readOnly
                        />
                        <InputField
                            label="proteins"
                            value={selectedProduct.proteins}
                            onChange={() => {}}
                            type="text"
                            readOnly
                        />
                        <InputField
                            label="fibers"
                            value={selectedProduct.fibers}
                            onChange={() => {}}
                            type="text"
                            readOnly
                        />
                        <InputField
                            label="carbohydrates"
                            value={calculatedCarbs}
                            onChange={() => {}}
                            type="text"
                            readOnly
                        />
                        <InputField
                            label="quantity_in_grams"
                            customLabel="Product Quantity (in grams)"
                            value={selectedProduct.quantity_in_grams}
                            onChange={(value) => setSelectedProduct({ ...selectedProduct, quantity_in_grams: value })}
                            type="text"
                        />
                    </EditModal>
                )}
                {isDeleteModalOpen && selectedProduct && userData && (
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        title="Delete Product"
                        message={`Are you sure you want to delete the product ${selectedProduct.name}?`}
                        onSubmit={() => deleteProductOfCart(selectedProduct)}
                        onCancel={handleCancel}
                    />
                )}
                {isCreateModalOpen && userData && (
                    <CreateModal
                        cartId={cart && cart.id}
                        isOpen={isCreateModalOpen}
                        title={`Please select a product to add to the cart`}
                        initialValues={selectedProduct}
                        submitLabel="Add the selected product"
                        onCancel={handleCancel}
                        getCartProductsList={getCartProductsList}
                        // onSubmit={(product) => addProductOnCart(product)}
                        currentProductList={productList}
                    />
                )}
                {isLoginModalOpen && (
                    <LoginModal
                        isOpen={isLoginModalOpen}
                        onCancel={handleCancel}
                        onSuccess={() => handleActionOnceLogged()}
                    />
                )}
            </div>
        </div>
    );
}
