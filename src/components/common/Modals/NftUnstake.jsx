/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import { MdCancel } from "react-icons/md";

import logo from "../../../assets/images/global/logo.svg";

const NftUnstake = ({ isOpen, closeModal }) => {
    const modalRef = useRef(null);
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
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
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 h-screen bg-black opacity-30"></div>

          <div className="container-blue p-[2px] rounded-lg min-w-[20rem] md:min-w-[25rem]" ref={modalRef}>
            <div className="bg-black rounded-lg px-4 pb-6 relative flex flex-col items-center">
                <div className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer" onClick={closeModal}>
                    <MdCancel className="w-5 h-5" />
                </div>
                
                <div className="container-blue rounded-full p-2 -translate-y-8">
                    <img src={logo} alt="logo" className="w-14 h-14" />
                </div>
                <h2 className="font-medium -mt-5 uppercase tracking-wider text-lg">NFT unstake</h2>

                <div className="p-4 px-12 md:px-0 rounded-md flex flex-row justify-between max-w-xl mx-auto text-sm uppercase gap-6">
                <div className="flex flex-col items-center text-center space-y-4 w-full">
                    <div className="container-blue py-2 px-4 w-full cursor-pointer">
                        safo
                    </div>

                    <div className="container-blue py-2 w-full cursor-pointer">
                        TMK
                    </div>

                    <div className="container-blue py-2 w-full cursor-pointer">
                        SAFO2
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-4 w-full">
                    <div className="container-blue py-2 px-4 w-full cursor-pointer">
                        1
                    </div>

                    <div className="container-blue py-2 w-full cursor-pointer">
                        2
                    </div>

                    <div className="container-blue py-2 w-full cursor-pointer">
                        3
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-4 w-full">
                    <div className="container-yellow py-2 px-4 w-full cursor-pointer">
                        Unstake
                    </div>

                    <div className="container-yellow py-2 w-full cursor-pointer">
                        Unstake
                    </div>

                    <div className="container-yellow py-2 w-full cursor-pointer">
                        Unstake
                    </div>
                </div>
                
                </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
export default NftUnstake;
