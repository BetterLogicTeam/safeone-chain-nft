/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { MdCancel } from "react-icons/md";

import logo from "../../../assets/images/global/logo.svg";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Web3 from "web3";
import { SEFO_NFT_Abi, SEFO_Token_Abi, SEFO_staking_Abi, SEFO_staking_Address } from "../../../utils/Contract";

const TokenStakeUnstakeModal = ({
  modalTypeStakeController,
  closeModal,
  token_Bal,
  id,
  User_NFT,
  num,
  poolData
}) => {
  const modalRef = useRef(null);
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const [get_Percentage, setget_Percentage] = useState(0);
  const [get_user_value, setget_user_value] = useState(0);

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
  const webSupply = new Web3("https://bsc-testnet.public.blastapi.io");
  const setUser_Balance = async () => {
    try {
      if (get_Percentage == 25) {
        let token_value = (token_Bal * 25) / 100;
        console.log("token_value",token_value);
        setget_user_value(token_value);
      } else if (get_Percentage == 50) {
        let token_value = (token_Bal * 50) / 100;
        setget_user_value(token_value);
      } else if (get_Percentage == 75) {
        let token_value = (token_Bal * 75) / 100;
        setget_user_value(token_value);
      } else if (get_Percentage == 100) {
        let token_value = token_Bal;
        setget_user_value(token_value);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const Token_Stake = async () => {
    try {
      if (acc) {
        if (Number(get_user_value) < Number(token_Bal)) {
          if (User_NFT.length != 0) {
            let nftContractOf = new webSupply.eth.Contract(
                SEFO_NFT_Abi,
                poolData?.StakednftAddress
              );
              let tokenContractOf = new webSupply.eth.Contract(
                SEFO_Token_Abi,
                poolData?.StakedtokenAddress
              );
              let ContractOf = new webSupply.eth.Contract(
                SEFO_staking_Abi,
                SEFO_staking_Address
              );

              let Token_values=webSupply.utils.toWei(get_user_value.toString())
              console.log("User_NFT[num]",poolData?.StakednftAddress);

              await tokenContractOf.methods.approve(SEFO_staking_Address,Token_values).send({
                from:acc
              })

              toast.success("Approve SuccessFully!")

              await nftContractOf.methods.setApprovalForAll(SEFO_staking_Address,true).send({
                from:acc
              })
              toast.success("NFT Approve SuccessFully!")

              await ContractOf.methods.staketoken(Token_values,User_NFT[num],id).send({
                from:acc
              })

              toast.success("Transaction SuccessFully ")


          } else {
            toast.error("No NFT Found!");
          }
        } else {
          toast.error("Insufficient Token");
        }
      } else {
        toast.error("Please Connect Wallet First!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modalTypeStakeController.status && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 h-screen bg-black opacity-30"></div>

          <div
            className="container-blue p-[2px] rounded-lg min-w-[20rem] md:min-w-[25rem]"
            ref={modalRef}
          >
            <div className="bg-black rounded-lg px-4 pb-6 relative flex flex-col items-center">
              <div
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                onClick={() => closeModal(modalTypeStakeController.type)}
              >
                <MdCancel className="w-5 h-5" />
              </div>

              <div className="container-blue rounded-full p-2 -translate-y-8">
                <img src={logo} alt="logo" className="w-14 h-14" />
              </div>
              <h2 className="font-medium -mt-5 uppercase tracking-wider text-lg">
                {modalTypeStakeController.heading}
              </h2>

              <div className="w-[18rem] flex justify-between items-center text-center text-sm mt-4">
                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(25), setUser_Balance())}
                >
                  25%
                </div>

                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(50), setUser_Balance())}
                >
                  50%
                </div>

                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(75), setUser_Balance())}
                >
                  75%
                </div>

                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(100), setUser_Balance())}
                >
                  100%
                </div>
              </div>

              <input
                type="text"
                className="border-none outline-none text-black p-2 w-[10rem] text-left mt-6"
                placeholder="0.00"
                value={get_user_value}
                onChange={(e) => setget_user_value(e.target.value)}
              />

              <div className="container-yellow py-2 cursor-pointer w-[15rem] text-center mt-4" onClick={()=>Token_Stake()}>
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
