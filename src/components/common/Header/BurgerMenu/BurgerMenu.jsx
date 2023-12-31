import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import headerData from "../../../../assets/data/header";

import { useLayoutContext } from "../../../../LayoutContext";
import {
  SEFO_staking_Abi,
  SEFO_staking_Address,
} from "../../../../utils/Contract";
import { useAccount } from "wagmi";
import Web3 from "web3";

const styles = {
  showMenuNav:
    "absolute top-0 left-0 flex flex-col justify-evenly items-center w-full h-screen bg-black transform translate-y-0 transition duration-500",
  hideMenuNav:
    "absolute top-0 left-0 flex flex-col justify-evenly items-center w-full h-screen bg-black transform -translate-y-full transition duration-500",
};

const BurgerMenu = () => {
  const { mobileOpen, setMobileOpen, active, setActive } = useLayoutContext();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  const webSupply = new Web3(
    "https://endpoints.omniatech.io/v1/eth/sepolia/public"
  );
  const { address } = useAccount();
  const [owner, setOwner] = useState("");
  const getOwner = async () => {
    try {
      let nftContractOf = new webSupply.eth.Contract(
        SEFO_staking_Abi,
        SEFO_staking_Address
      );

      let owner = await nftContractOf.methods.owner().call();
      setOwner(owner);
      // console.log(owner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  return (
    <div className="flex items-center justify-between border-b border-black py-8">
      <nav>
        <div
          className={
            mobileOpen ? `${styles.showMenuNav}` : `${styles.hideMenuNav}`
          }
        >
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              className="h-8 w-8 text-white cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          <ul className="flex flex-col items-center justify-between min-h-[250px]">
            {headerData.map((header, index) => (
              <Link
                key={index}
                className={`flex rounded-md p-2 cursor-pointer text-white text-lg items-center gap-x-4 mt-2`}
                to={header.link}
                target={header.link.includes("http") ? "_blank" : "_self"}
                onClick={() => setActive(index)}
              >
                <span
                  className={`flex items-center gap-x-2 ${
                    active === index &&
                    "text-lg p-2 rounded-sm font-medium text-black bg-white"
                  }`}
                >
                  <span className={`${active === index ? "block" : "hidden"}`}>
                    <FaChevronRight className={`text-black text-2xl`} />
                  </span>{" "}
                  {header.title}
                </span>
              </Link>
            ))}

            {owner?.toUpperCase() === address?.toUpperCase() && (
              <Link
                className={`flex rounded-md p-2 cursor-pointer text-white text-lg items-center gap-x-4 mt-2`}
                to="/Admin_Panel"
                onClick={() => setActive(5)}
              >
                <span
                  className={`flex items-center gap-x-2 ${
                    active === 5 &&
                    "text-lg p-2 rounded-sm font-medium text-black bg-white"
                  }`}
                >
                  <span className={`${active === 5 ? "block" : "hidden"}`}>
                    <FaChevronRight className={`text-black text-2xl`} />
                  </span>{" "}
                  Admin Panel
                </span>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default BurgerMenu;
