/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import { MdCancel } from "react-icons/md";

import logo from "../../../assets/images/global/logo.svg";

const TokenStakeUnstakeModal = ({ modalTypeStakeController, closeModal }) => {
    const modalRef = useRef(null);
    
    useEffect(() => {
        if (modalTypeStakeController.status) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [modalTypeStakeController.status]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal(modalTypeStakeController.type);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalTypeStakeController.type]);


  return (
    <>
      {modalTypeStakeController.status && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 h-screen bg-black opacity-30"></div>

          <div className="container-blue p-[2px] rounded-lg min-w-[20rem] md:min-w-[25rem]" ref={modalRef}>
            <div className="bg-black rounded-lg px-4 pb-6 relative flex flex-col items-center">
                <div className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer" onClick={() => closeModal(modalTypeStakeController.type)}>
                    <MdCancel className="w-5 h-5" />
                </div>
                
                <div className="container-blue rounded-full p-2 -translate-y-8">
                    <img src={logo} alt="logo" className="w-14 h-14" />
                </div>
                <h2 className="font-medium -mt-5 uppercase tracking-wider text-lg">{modalTypeStakeController.heading}</h2>
                
                <div className="w-[18rem] flex justify-between items-center text-center text-sm mt-4">
                    <div className="container-blue py-2 cursor-pointer px-3">25%</div>

                    <div className="container-blue py-2 cursor-pointer px-3">50%</div>

                    <div className="container-blue py-2 cursor-pointer px-3">75%</div>

                    <div className="container-blue py-2 cursor-pointer px-3">100%</div>
                </div>

                <input type="text" className="border-none outline-none text-black p-2 w-[10rem] text-left mt-6" placeholder="0.00" />

                <div className="container-yellow py-2 cursor-pointer w-[15rem] text-center mt-4">
                    {modalTypeStakeController.button}
                </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
export default TokenStakeUnstakeModal;
