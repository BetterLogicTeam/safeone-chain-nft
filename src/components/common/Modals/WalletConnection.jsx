import { useEffect, useRef } from "react";

import logo from "../../../assets/images/global/logo.svg";
import wallet_connect from "../../../assets/images/global/walletConnection/wallet_connect.svg";
import metamask from "../../../assets/images/global/walletConnection/metamask.svg";
import { useDispatch } from "react-redux";
import { connectWalletAction } from "../../../store/actions/login";

// eslint-disable-next-line react/prop-types
const WalletConnection = ({ open, handleModalClose }) => {
    const modalRef = useRef(null);
    const dispatch = useDispatch();


    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleModalClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



  return (
    <>
        {
            open && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 h-screen bg-black opacity-30 minus-zIndex"></div>

                    <div className="container-blue p-[2px] rounded-lg" ref={modalRef}>
                        <div className="w-full max-w-sm p-4 rounded-lg shadow sm:p-6 bg-black">
                            
                            <div className="flex justify-center items-center">
                                <div className="container-blue rounded-full p-1 -translate-y-14 flex items-center justify-center">
                                    <img src={logo} alt="logo" className="w-14 h-14" />
                                </div>
                            </div>

                            <h5 className="-mt-12 mb-4 text-lg font-semibold md:text-2xl text-center text-background">
                                Connect wallet
                            </h5>
                            <ul className="my-4 space-y-3 text-white">
                                <li onClick={()=>(dispatch(connectWalletAction(2)),handleModalClose())}>
                                    <div className="flex items-center p-3 text-base font-bold rounded-lg hover:shadow bg-gray-600 hover:bg-gray-500 cursor-pointer">
                                        <img src={metamask} alt="metamask" className="w-5 h-5" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">MetaMask</span>
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                    </div>
                                </li>
                                <li  onClick={()=>(dispatch(connectWalletAction(1)),handleModalClose())}>
                                    <div className="flex items-center p-3 text-base font-bold rounded-lg hover:shadow bg-gray-600 hover:bg-gray-500 text-white">
                                        <img src={wallet_connect} alt="wallet_connect" className="w-5 h-5" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">WalletConnect</span>
                                    </div>
                                    <div>
                                        <p className="mt-4 inline-flex items-center text-xs font-normal text-gray-400">
                                            Connect with one of our available wallet providers or create a new one.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            )
        }
    </>

  )
}
export default WalletConnection