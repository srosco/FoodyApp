'use client';

import React, { useContext, useEffect } from "react";
import "../globals.css";
import { UserContext } from "../context/UserContext";
import LoginModal from "@/assets/loginModal";
import axios from "axios";

const TitleOfPage = ({ title }: { title: string }) => {
    return (
        <div className="flex w-full gap-10 flex-row justify-between">
            <div className="flex flex-grow items-center">
                <h1 className="p-5 text-3xl font-bold">{title}</h1>
            </div>
        </div>
    )
}

type MaccroType = {
    totalCalories: number;
    totalProteins: number;
    totalFibers: number;
    totalCarbohydrates: number;
}

export default function Page() {
    const title: string = 'Dashboard';
    const { userData, logout } = useContext(UserContext) as any;
    const [actionAfterLogin, setActionAfterLogin] = React.useState("");  // Delete Modal state here
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);  // Delete Modal state here
    // const [currentCarbohydrates, setCurrentCarbohydrates] = React.useState(null);
    // const [currentFibers, setCurrentFibers] = React.useState(null);
    // const [currentProteins, setCurrentProteins] = React.useState(null);
    // const [currentCalories, setCurrentCalories] = React.useState(null);
    const [currentMaccros, setCurrentMaccros] = React.useState<MaccroType>();

    const handleCancel = () => {
        isLoginModalOpen && setIsLoginModalOpen(false); // Close Login modal
    };

    const getUserCartMaccros = async () => {
        if (userData) {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_CART_USER}/${userData.id}/summary`);

                    setCurrentMaccros(response.data);

            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    }

    const getMaccroCustomLabel = (maccroValue: number, name: string) => {
        if (maccroValue < 0) {
            return `You are exceeding ${Math.abs(maccroValue).toFixed(1)} ${name}`;
        }
        return `You have ${maccroValue.toFixed(1)} ${name} remaining`;
    }

    
    useEffect(() => {
        if (!userData) {
            setActionAfterLogin("product");
            setIsLoginModalOpen(true);
        }
        else {
            getUserCartMaccros();
        }
    }, [userData])

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
                <div className="p-5">
                    {currentMaccros && (
                        <div>
                            Synthesis of the user <strong>{userData.first_name} :</strong> 
                            <div>
                                 Maccros are :
                                <div>
                                    Your aimed <strong>Carbohydrates : {userData.aimed_carbohydrates.toFixed(1)}</strong> / Total cart's values <strong>: {currentMaccros.totalCarbohydrates.toFixed(1)}</strong>
                                </div>
                                <div>
                                    Your aimed <strong>Proteins : {userData.aimed_proteins.toFixed(1)}</strong> / Total cart's values <strong>: {currentMaccros.totalProteins.toFixed(1)}</strong>
                                </div>
                                <div>
                                    Your aimed <strong>Fibers : {userData.aimed_fibers.toFixed(1)}</strong> / Total cart's values  <strong>: {currentMaccros.totalFibers.toFixed(1)}</strong>
                                </div>
                                <div>
                                    Your aimed <strong>Calories : {userData.aimed_calories.toFixed(1)}</strong> / Total cart's values <strong>: {currentMaccros.totalCalories.toFixed(1)}</strong>
                                </div>
                            </div>
                            <div className="p-5"></div>
                            <div>
                                {getMaccroCustomLabel(userData.aimed_carbohydrates - currentMaccros.totalCarbohydrates, 'Carbohydrates')}
                            </div>
                            <div>
                                {getMaccroCustomLabel(userData.aimed_proteins - currentMaccros.totalProteins, 'Proteins')}
                            </div>
                            <div>
                                {getMaccroCustomLabel(userData.aimed_fibers - currentMaccros.totalFibers, 'Fibers')}
                            </div>
                            <div>
                                {getMaccroCustomLabel(userData.aimed_calories - currentMaccros.totalCalories, 'Calories')}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
