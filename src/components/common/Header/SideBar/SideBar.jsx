import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

// Data
import headerData from "../../../../assets/data/header";

// Context
import { useLayoutContext } from "../../../../LayoutContext";
import Web3 from "web3";
import {
  SEFO_staking_Abi,
  SEFO_staking_Address,
} from "../../../../utils/Contract";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const SideBar = () => {
  const { active, setActive } = useLayoutContext();
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
    <div className={``}>
      <ul className="py-3">
        {headerData.map((header, index) => {
          return (
            <>
              <Link
                key={index}
                className={`flex rounded-md p-2 cursor-pointer text-lg items-center gap-x-4 mt-2 ${
                  active === index &&
                  "p-2 rounded-sm font-medium text-black bg-white"
                }`}
                to={header.link}
                target={header.link.includes("http") ? "_blank" : "_self"}
                onClick={() => setActive(index)}
              >
                <span className={`flex items-center gap-x-2 pl-3`}>
                  <span className={`${active === index ? "block" : "hidden"}`}>
                    <AiOutlineRight className={`text-black text-2xl`} />
                  </span>
                  {header.title}
                </span>
              </Link>
            </>
          );
        })}
        {
          owner?.toUpperCase()===address?.toUpperCase()&& 
          (
            <Link
            key={5}
            className={`flex rounded-md p-2 cursor-pointer text-lg items-center gap-x-4 mt-2 ${
              active === 5 && "p-2 rounded-sm font-medium text-black bg-white"
            }`}
            to="/Admin_Panel"
            onClick={() => setActive(5)}
          >
            <span className={`flex items-center gap-x-2 pl-3`}>
              <span className={`${active === 5 ? "block" : "hidden"}`}>
                <AiOutlineRight className={`text-black text-2xl`} />
              </span>
              Admin Panel
            </span>
          </Link>
          )
        }
       
      </ul>
    </div>
  );
};

export default SideBar;
