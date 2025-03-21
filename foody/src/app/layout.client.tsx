"use client";

import "./globals.css";
import Image from 'next/image';
import fruitLogo from '../assets/fruit-mosaique.jpg';
import arrowDownSvg from '../assets/arrow-down.svg';
import arrowUpSvg from '../assets/arrow-up.svg';
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminIcon from '../assets/admin.svg';
import homeIcon from '../assets/home.svg';
import dashboardIcon from '../assets/dashboard.svg';
import userIcon from '../assets/user.svg';
import productIcon from '../assets/products.svg';
import calibrationIcon from '../assets/calibration.svg';


export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [iconsCollapsed, setIconsCollapsed] = useState(true);
  const router = useRouter();

  // Ensuring we are on the client side to prevent SSR issues
  useEffect(() => {
    setIsClient(true);
  }, [isClient, iconsCollapsed]);

  // Handle redirection with router.push
  const handleRedirect = useCallback((path: string) => {
    if (isClient && router) {
      router.push(path);
    }
  }, [isClient, router]);

  if (!isClient) {
    return null;  // Prevent rendering during SSR
  }

  // FruitIcon component to toggle collapse state
  const FruitIcon = React.memo(() => {
    const toggleCollapse = () => {
      setIconsCollapsed((prev) => !prev);  // Toggle collapse state
    };

    return (
      <div onClick={toggleCollapse} className="w-fit self-end">
        <Image
          src={fruitLogo}
          width={75}
          priority
          className="rounded-3xl max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
          alt="Fruit Logo"
        />
        <Image
          src={iconsCollapsed ? arrowDownSvg : arrowUpSvg}
          width={50}
          alt="Arrow"
          className="size-11 animate-bounce justify-self-center mt-4"
        />
      </div>
    );
  });

  // CollapsableIcon component to show icon and name
  const CollapsableIcon = React.memo(({ routeName, routePath, iconToDisplay }: { routeName: string, routePath: string, iconToDisplay: any }) => {
    return (
      <div
        className={`${iconsCollapsed ? 'collapse fadeBounce 0.75s ease-out' : 'visible transition duration-300 ease-in-out hover:scale-105'} relative group self-end mb-4 pt-[0.75em] pr-[0.35em] w-fit`}
        data-twe-ripple-init
        data-twe-ripple-color="light"
        onClick={() => handleRedirect(routePath)}
      >
        <div className="rounded-3xl max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer">
          <Image
            src={iconToDisplay}
            width={65}
            height={65}
            className="rounded-3xl max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
            alt={`Icon for ${routeName}`}
          />
          <span className="text-xs cursor-pointer absolute left-1/2 transform -translate-x-1/2 -bottom-5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
            {routeName}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-grow flex-start flex-row-reverse justify-between p-5 h-screen overflow-hidden">
      <div>
        <FruitIcon />
        <CollapsableIcon routeName="HomePage" routePath="/" iconToDisplay={homeIcon} />
        <CollapsableIcon routeName="Calibration" routePath="/calibration" iconToDisplay={calibrationIcon} />
        <CollapsableIcon routeName="Dashboard" routePath="/dashboard" iconToDisplay={dashboardIcon} />
        <CollapsableIcon routeName="User" routePath="/userPage" iconToDisplay={userIcon} />
        <CollapsableIcon routeName="Products" routePath="/productsList" iconToDisplay={productIcon} />
        <CollapsableIcon routeName="Admin" routePath="/adminPage" iconToDisplay={adminIcon} />
      </div>
      {children}
    </div>
  );
}
