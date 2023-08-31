import { useEffect, useRef } from "react";

import { MdCancel } from "react-icons/md";

import logo from "../../../assets/images/global/logo.svg";

export default function NFTStakingModal({
  closeModal,
  nftSeriesModal,
  decNum,
  incNum,
  handleChange,
  num,
}) {
  const modalRef = useRef(null);

  // console.log("modalRef", nftSeriesModal.type);

  useEffect(() => {
    if (nftSeriesModal.status) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [nftSeriesModal.status]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal(nftSeriesModal.type);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nftSeriesModal.type]);

  return (
    <div>
      {nftSeriesModal.status && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 h-screen bg-black opacity-30"></div>

          <div
            className="container-blue p-[2px] rounded-lg min-w-[25rem]"
            ref={modalRef}
          >
            <div className="bg-black rounded-lg px-4 pb-6 relative flex flex-col items-center">
              <div
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                onClick={() => closeModal(nftSeriesModal.type)}
              >
                <MdCancel className="w-5 h-5" />
              </div>

              <div className="container-blue rounded-full p-2 -translate-y-8">
                <img src={logo} alt="logo" className="w-14 h-14" />
              </div>

              <h2 className="font-medium -mt-5 uppercase tracking-wider text-lg">
                {nftSeriesModal.heading}
              </h2>
              <div style={{ display: "flex" }}>
                <div
                  className="container-blue py-2 cursor-pointer w-[5rem] text-center mt-4 me-2"
                  onClick={decNum}
                >
                  {nftSeriesModal.decrement_button}
                </div>
                <div className=" cursor-pointer w-[5rem] text-center mt-4 me-2 ">
                  <input
                    type="text"
                    defaultValue="1"
                    value={num}
                    className="p-2 w-[5rem] text-center bg-[#111111] "
                  />
                </div>
                <div
                  className="container-blue py-2 cursor-pointer w-[5rem] text-center mt-4 me-2"
                  onClick={incNum}
                >
                  {nftSeriesModal.button}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
