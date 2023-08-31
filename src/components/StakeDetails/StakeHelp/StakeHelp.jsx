import { useEffect, useState } from "react";
import logo from "../../../assets/images/global/logo.svg";
import ModalTypeOne from "../../common/Modals/ModalTypeOne";
import TokenStakeUnstakeModal from "../../common/Modals/TokenStakeUnstakeModal";
import NftUnstake from "../../common/Modals/NftUnstake";
import HelpModal from "../../common/Modals/HelpModal";
import NFTStakingModal from "../../common/Modals/NFTStakingModal";
import Web3 from "web3";
import {
  SEFO_NFT_Abi,
  SEFO_Token_Abi,
  SEFO_staking_Abi,
  SEFO_staking_Address,
} from "../../../utils/Contract";
import { useSelector } from "react-redux";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";

const StakeHelp = ({ poolData, id }) => {
  const [modalTypeOneController, setModalTypeOneController] = useState({
    status: false,
    heading: "",
    button: "",
    decrement_button: "",
    type: "",
  });
  const [modalTypeStakeController, setModalTypeStakeController] = useState({
    status: false,
    heading: "",
    button: "",
    type: "",
  });
  const [nftUnstake, setNftUnstake] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  let [num, setNum] = useState(0);
  const [User_NFT, setUser_NFT] = useState(0);
  const [token_Bal, settoken_Bal] = useState(0);
  const { address } = useAccount();
  const [spinner, setSpinner] = useState(false);

  const webSupply = new Web3(
    "https://endpoints.omniatech.io/v1/eth/sepolia/public"
  );

  const get_user_NFTs = async () => {
    try {
      let nftContractOf = new webSupply.eth.Contract(
        SEFO_NFT_Abi,
        poolData?.StakednftAddress
      );
      let tokenContractOf = new webSupply.eth.Contract(
        SEFO_Token_Abi,
        poolData?.StakedtokenAddress
      );
      let walletOfOwner = await nftContractOf.methods
        .walletOfOwner(address)
        .call();
      setUser_NFT(walletOfOwner);

      let Token_Balance = await tokenContractOf.methods
        .balanceOf(address)
        .call();
      console.log("Token_Balance", Token_Balance);
      settoken_Bal(webSupply.utils.fromWei(Token_Balance.toString()));
    } catch (error) {
      console.log(error);
    }
  };

  let incNum = () => {
    if (num < User_NFT.length) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
  };

  useEffect(() => {
    get_user_NFTs();
  }, [num]);

  const [staking_model, setstaking_model] = useState({
    status: false,
    heading: "",
    button: "",
    decrement_button: "",
    type: "",
  });

  const closeModal = (modal) => {
    switch (modal) {
      case "nftSeriesModal":
      case "stakeNftModal":
        setstaking_model({
          status: false,
          heading: "",
          button: "",
          decrement_button: "",
          type: "",
        });
        break;
      case "emergencyAllModal":
        setModalTypeOneController({
          status: false,
          heading: "",
          button: "",
          decrement_button: "",
          type: "",
        });
        break;
      case "tokenStakeModal":
      case "tokenUnstakeModal":
        setModalTypeStakeController({
          status: false,
          heading: "",
          button: "",
          type: "",
        });
        break;
      default:
        break;
    }
  };

  const harvest = async () => {
    try {
      setSpinner(true);
      const harvest = await prepareWriteContract({
        address: SEFO_staking_Address,
        abi: SEFO_staking_Abi,
        functionName: "harvest",
        args: [id],
        account: address,
      });
      const harvesthash = await writeContract(harvest.request);
      await waitForTransaction({
        hash: harvesthash.hash,
      });
      toast.success("Transaction SuccessFully!");
      setSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <>
      <ModalTypeOne
        closeModal={closeModal}
        nftSeriesModal={modalTypeOneController}
        // pass a function to set the button inside this component
      />
      <NFTStakingModal
        closeModal={closeModal}
        nftSeriesModal={staking_model}
        handleChange={handleChange}
        incNum={incNum}
        decNum={decNum}
        num={num}
      />

      <TokenStakeUnstakeModal
        closeModal={closeModal}
        modalTypeStakeController={modalTypeStakeController}
        token_Bal={token_Bal}
        id={id}
        User_NFT={User_NFT}
        num={num}
        poolData={poolData}
      />

      <NftUnstake isOpen={nftUnstake} closeModal={() => setNftUnstake(false)} />

      <HelpModal isOpen={helpModal} closeModal={() => setHelpModal(false)} />

      <div className="bg-[#111111] text-black font-medium rounded-lg pb-6">
        <div className="p-4 px-12 md:px-0 rounded-md flex flex-col items-center md:flex-row md:justify-between max-w-3xl mx-auto text-sm uppercase gap-16">
          <div className="flex flex-col items-center text-center space-y-6 w-full">
            <div
              className="container-yellow py-2 px-12 w-full cursor-pointer"
              onClick={() => {
                setModalTypeOneController({
                  status: true,
                  heading: "NFT Series",
                  button: "SAFO",
                  type: "nftSeriesModal",
                });
              }}
            >
              NFT Series
            </div>

            <div
              className="container-yellow py-2 w-full cursor-pointer"
              onClick={() => {
                setstaking_model({
                  status: true,
                  heading: "Stake NFT",
                  button: "+",
                  decrement_button: "-",
                  type: "stakeNftModal",
                });
              }}
            >
              Stake NFT
            </div>

            <div
              className="container-yellow py-2 w-full cursor-pointer"
              onClick={() =>
                setModalTypeStakeController({
                  status: true,
                  heading: "Token Stake",
                  button: "stake",
                  type: "tokenStakeModal",
                })
              }
            >
              Token Stake
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-10 w-full">
            <img src={logo} alt="logo" className="w-20 h-20" />

            <div
              className="container-blue py-2 w-full cursor-pointer"
              onClick={() => setHelpModal(true)}
            >
              Help
            </div>

            <div className="container-blue py-2 w-full cursor-pointer">
              Buy NFTs
            </div>

            <div className="container-blue py-2 w-full cursor-pointer">
              But Tokens
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-6 w-full">
            <div
              className="container-yellow py-2 w-full cursor-pointer"
              onClick={() => setNftUnstake(true)}
            >
              NFT Unstake
            </div>

            <div
              className="container-yellow py-2 w-full cursor-pointer"
              onClick={() =>
                setModalTypeStakeController({
                  status: true,
                  heading: "Token Unstake",
                  button: "unstake",
                  type: "tokenUnstakeModal",
                })
              }
            >
              Token untake
            </div>

            <div
              className="container-yellow py-2 w-full cursor-pointer"
              onClick={() =>
                setModalTypeOneController({
                  status: true,
                  heading: "Emergency All",
                  button: "unstake all tokens & nfts",
                  type: "emergencyAllModal",
                })
              }
            >
              Emergency All
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 flex justify-center items-center" onClick={harvest}>
        <div className="container-yellow py-2 px-10 uppercase text-black text-sm cursor-pointer">
          {spinner ? "Loading..." : "Harvest"}
        </div>
      </div>
    </>
  );
};
export default StakeHelp;
