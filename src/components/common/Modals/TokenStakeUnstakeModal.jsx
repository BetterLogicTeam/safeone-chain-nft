/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";

import { MdCancel } from "react-icons/md";

import logo from "../../../assets/images/global/logo.svg";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Web3 from "web3";
import {
  SEFO_NFT_Abi,
  SEFO_Token_Abi,
  SEFO_Token_Address,
  SEFO_staking_Abi,
  SEFO_staking_Address,
} from "../../../utils/Contract";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import { useLocation, useNavigate } from "react-router-dom";

const TokenStakeUnstakeModal = ({
  modalTypeStakeController,
  closeModal,
  token_Bal,
  id,
  User_NFT,
  num,
  poolData,
}) => {
  const modalRef = useRef(null);
  let history=useNavigate()
  const [get_Percentage, setget_Percentage] = useState(0);
  const [get_user_value, setget_user_value] = useState(0);
  const [spinner, setspinner] = useState(false);
  const { address } = useAccount();

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
        console.log("token_value", token_value);
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

  useMemo(() => setUser_Balance(), [get_Percentage]);

  const Token_Stake = async () => {
    try {
      if (address) {
        if (Number(get_user_value) < Number(token_Bal)) {
          if (User_NFT.length != 0) {
            if (get_user_value == 0) {
              toast.error("Please Enter token Amount !");
              setspinner(false);
            } else if(Number(get_user_value) > Number(webSupply.utils.fromWei(poolData.minimumDeposit.toString()))) {
              setspinner(true);
              let NFt_arry=[]
              for(let i=0;i<num;i++){
                NFt_arry=[...NFt_arry,User_NFT[i]]
              }

              console.log("User_NFT[0]", NFt_arry);
              let Token_values = webSupply.utils.toWei(
                parseInt(get_user_value).toString()
              );
              const approve = await prepareWriteContract({
                address: SEFO_Token_Address,
                abi: SEFO_Token_Abi,
                functionName: "approve",
                args: [SEFO_staking_Address, Token_values],
                account: address,
              });
              const approvehash = await writeContract(approve.request);
              await waitForTransaction({
                hash: approvehash.hash,
              });
              toast.success("Approve SuccessFully!");

              const setApprovalForAll = await prepareWriteContract({
                address: poolData?.StakednftAddress,
                abi: SEFO_NFT_Abi,
                functionName: "setApprovalForAll",
                args: [SEFO_staking_Address, true],
                account: address,
              });

              const setApprovalForAllhash = await writeContract(
                setApprovalForAll.request
              );
              await waitForTransaction({
                hash: setApprovalForAllhash.hash,
              });
              toast.success("NFT Approve SuccessFully!");

              const staketoken = await prepareWriteContract({
                address: SEFO_staking_Address,
                abi: SEFO_staking_Abi,
                functionName: "staketoken",
                args: [Token_values, NFt_arry, id],
                account: address,
              });

              const staketokenhash = await writeContract(staketoken.request);
              await waitForTransaction({
                hash: staketokenhash.hash,
              });
              toast.success("Transaction SuccessFully ");
              setspinner(false);
              history("/")
            }else{
              toast.error(`Please Enter Token greater then ${webSupply.utils.fromWei(poolData.minimumDeposit.toString())} `);
              setspinner(false);
            }
          } else {
            toast.error("No NFT Found!");
            setspinner(false);
          }
        } else {
          toast.error("Insufficient Token");
          setspinner(false);
        }
      } else {
        toast.error("Please Connect Wallet First!");
        setspinner(false);
      }
    } catch (error) {
      setspinner(false);

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
                  onClick={() => (setget_Percentage(25))}
                >
                  25%
                </div>

                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(50))}
                >
                  50%
                </div>

                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(75))}
                >
                  75%
                </div>

                <div
                  className="container-blue py-2 cursor-pointer px-3"
                  onClick={() => (setget_Percentage(100))}
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

              <div
                className="container-yellow py-2 cursor-pointer w-[15rem] text-center mt-4"
                onClick={() => Token_Stake()}
              >
                {spinner ? (
                  <>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  <>{modalTypeStakeController.button}</>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TokenStakeUnstakeModal;
