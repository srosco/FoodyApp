import { useEffect, useState } from "react";

interface ToastNotificationProps {
    icon: string; // This allows any valid JSX element (SVG, Image, Font Icon, etc.)
    message: string; // The message to display in the toast
    duration?: number; // Optional duration for how long the toast stays visible (defaults to 5000ms)
}


const ToastNotifications: React.FC<ToastNotificationProps> = ({ icon, message, duration = 5000 }) => {

    const [isVisible, setIsVisible] = useState(true);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const fadeTimeout = setTimeout(() => {
            setFade(true); // Start fading out after the duration
        }, duration - 500); // Fade starts 500ms before the toast disappears (for the fade effect)

        const removeTimeout = setTimeout(() => {
            setIsVisible(false); // Hide the toast completely after the fade-out effect
        }, duration); // Match this with the duration for the toast to stay visible

        // Clean up timeouts when the component unmounts or duration changes
        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(removeTimeout);
        };
    }, [duration]);

    const handleClose = () => {
        // In case the user manually closes the toast, trigger the fade-out effect immediately
        setFade(true);
        setTimeout(() => {
            setIsVisible(false); // Remove the toast after the fade-out
        }, 500); // Fade duration
    };

    if (!isVisible) return null;

    return (
        isVisible && (
            <div
                className={`pl-2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 
            ${fade ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 fixed bottom-0 right-0 mr-5 mb-5"`}
                role="alert"
            >
                {/* Dynamically render the icon */}
                {icon === 'success' ? (
                    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-red-200">
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>
                        <span className="sr-only">Error icon</span>
                    </div>
                )}
                <div className="ms-3 text-sm font-normal">{message}</div>
                <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    aria-label="Close"
                    onClick={handleClose} // Attach the event handler here
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
        ))
};

export default ToastNotifications;