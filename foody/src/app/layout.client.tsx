import "./globals.css";
import Image from "next/image";
import fruitLogo from "../assets/fruit-mosaique.jpg";
import arrowDownSvg from "../assets/arrow-down.svg";
import arrowUpSvg from "../assets/arrow-up.svg";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminIcon from "../assets/admin.svg";
import homeIcon from "../assets/home.svg";
import dashboardIcon from "../assets/dashboard.svg";
import userIcon from "../assets/user.svg";
import productIcon from "../assets/products.svg";
import calibrationIcon from "../assets/calibration.svg";
import { useNotificationContext } from "./context/NotificationContext";
import ToastNotifications from "@/assets/ToastNotifications";
import { UserContext, UserProvider, useUserContext } from "./context/UserContext";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <UserProvider>
      <LayoutWithContext>{children}</LayoutWithContext>
    </UserProvider>
  );
}

function LayoutWithContext({ children }: { children: React.ReactNode }) {
  const [iconsCollapsed, setIconsCollapsed] = useState(true);
  const [displayLogoutIcon, setDisplayLogoutIcon] = useState(false);
  const router = useRouter();

  const { userData, logout, loading } = useUserContext();
  const { successMessage, errorMessage, clearMessages } = useNotificationContext();

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        clearMessages();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, clearMessages]);

  useEffect(() => {
    if (userData) {
      setDisplayLogoutIcon(true);
    }
  }, [userData]);

  const handleRedirect = useCallback(
    (path: string) => {
      if (router) {
        router.push(path);
      }
    },
    [router]
  );

  const FruitIcon = React.memo(() => {
    const toggleCollapse = () => {
      setIconsCollapsed((prev) => !prev);
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

  const CollapsableIcon = React.memo(
    ({
      routeName,
      routePath,
      iconToDisplay,
    }: {
      routeName: string;
      routePath: string;
      iconToDisplay: any;
    }) => {
      return (
        <div
          className={`${
            iconsCollapsed
              ? "collapse fadeBounce 0.75s ease-out"
              : "visible transition duration-300 ease-in-out hover:scale-105"
          } relative group self-end mb-4 pt-[0.75em] pr-[0.35em] w-fit`}
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
    }
  );

  return (
    <div className="flex flex-grow flex-start flex-row-reverse justify-between p-5 h-screen overflow-hidden">
      <div className="flex flex-col gap-5">
        <FruitIcon />
        <CollapsableIcon routeName="HomePage" routePath="/" iconToDisplay={homeIcon} />
        <CollapsableIcon routeName="Carts" routePath="/cartList" iconToDisplay={calibrationIcon} />
        <CollapsableIcon routeName="Dashboard" routePath="/dashboard" iconToDisplay={dashboardIcon} />
        <CollapsableIcon routeName="User" routePath="/userPage" iconToDisplay={userIcon} />
        <CollapsableIcon routeName="Products" routePath="/productsList" iconToDisplay={productIcon} />
        <CollapsableIcon routeName="Admin" routePath="/adminPage" iconToDisplay={adminIcon} />
        {/* {displayLogoutIcon && <button onClick={logout}>Disconnect</button>} */}
      </div>

      {children}

      {successMessage && <ToastNotifications message={successMessage} icon="success" />}
      {errorMessage && <ToastNotifications message={errorMessage} icon="error" />}
    </div>
  );
}
