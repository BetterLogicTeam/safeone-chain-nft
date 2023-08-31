import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Style_Admin.css";

import { toast } from "react-hot-toast";

import { SEFO_staking_Abi, SEFO_staking_Address } from "../../utils/Contract";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";

import { useAccount } from "wagmi";
import Web3 from "web3";
import DesktopTable from "../Home/DesktopTable";
import MobileTable from "../Home/MobileTable";
import Create_Pool from "./Create_Pool";
import { useLocation, useNavigate } from "react-router-dom";

export default function Admin_Panel() {
  const [pool_create, setPool_create] = useState(false);
  const { address } = useAccount();
  const [poll_Array, setpoll_Array] = useState([]);
  const webSupply = new Web3(
    "https://endpoints.omniatech.io/v1/eth/sepolia/public"
  );
  let history = useLocation();
  let Navigate=useNavigate()



  const pools = async () => {
    try {
      let newArray = [];
      let nftContractOf = new webSupply.eth.Contract(
        SEFO_staking_Abi,
        SEFO_staking_Address
      );

      let pool_Count = await nftContractOf.methods.poolsCount().call();

      for (let i = 1; i <= pool_Count; i++) {
        let pool = await nftContractOf.methods.pools(i).call();
        // console.log("Pool",pool);
        newArray = [
          ...newArray,
          {
            apy: pool.apy,
            poolLogo: pool.poolLogo,
            lockableDays: pool.lockableDays,
            StakedtokenAddress: pool.StakedtokenAddress,
            StakednftAddress: pool.StakednftAddress,
            minimumDeposit: pool.minimumDeposit,
            isStarted: pool.isStarted,
          },
        ];
      }
      setpoll_Array(newArray);

      // console.log("newArray", newArray);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    pools();

    let intveral = setInterval(() => {
      if (window.location.href.includes("EditPool")) {
        let UserID = window.location.href.split("?");
        UserID = UserID[UserID.length - 1];
        //  console.log("UserID",UserID);
        setPool_create(true);
      }
    }, 1000);
    return () => clearInterval(intveral);
  }, []);

  return (
    <div>
      <section className=" lg:block p-16 lg:p-24 max-w-7xl mx-auto">
        <div className="flex justify-end md:justify-end items-end">
          <button
            className="px-4 lg:px-6 py-2 mb-5 home-table-view cursor-pointer "
            onClick={() => (setPool_create(!pool_create),Navigate('/Admin_Panel'))}
          >
            Create New Pool
          </button>
        </div>
        {pool_create ? (
          <>
            <Create_Pool Editdata={history.state} />
          </>
        ) : (
          <>
            <main>
              <section className="hidden lg:block p-16 lg:p-10 max-w-9xl mx-auto">
                <DesktopTable poll_Array={poll_Array} admin={true} />
              </section>

              <section className="lg:hidden py-4 max-w-xl mx-auto">
                <MobileTable poll_Array={poll_Array} admin={true} />
              </section>
            </main>
          </>
        )}
      </section>
    </div>
  );
}
