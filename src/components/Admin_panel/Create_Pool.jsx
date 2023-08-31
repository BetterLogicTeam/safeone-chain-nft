import React, { useEffect, useState } from "react";
import { SEFO_staking_Abi, SEFO_staking_Address } from "../../utils/Contract";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import "./Style_Admin.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useSelector } from "react-redux";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import Web3 from "web3";
import { useLocation, useNavigate } from "react-router-dom";

const projectId = "2IBOoZHHXKmt5N3fdE1kiHWISeV";
const projectSecretKey = "c119b93e540651a5580d99ef3b43a756";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

export default function Create_Pool({ Editdata }) {
  const [selectedValue, setSelectedValue] = React.useState(true);
  const [getUserData, setgetUserData] = useState({
    Apy: "",
    MinimumDeposit: "",
    StakedtokenAddress: "",
    StakednftAddress: "",
  });
  const [getUserLogo, setgetUserLogo] = useState(null);
 
  let history = useNavigate()
  const [LockableDays, setLockableDays] = useState(
    Editdata?.lockableDays || 30
  );
  const [spinner, setspinner] = useState(false);
  const webSupply = new Web3(
    "https://endpoints.omniatech.io/v1/eth/sepolia/public"
  );
  const { address } = useAccount();
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",

    headers: {
      authorization,
    },
  });

  const handleGet = (event) => {
    setgetUserData({ ...getUserData, [event.target.name]: event.target.value });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const CreatePool = async () => {
    try {
      if (getUserLogo != null) {
        if (address) {
          if (
            getUserData.StakednftAddress == "" ||
            getUserData.StakedtokenAddress == "" ||
            getUserData.MinimumDeposit == "" ||
            getUserData.Apy == ""
          ) {
            toast.error("Please Fill all input fields");
          }
          //   console.log("AAA", typeof Boolean(selectedValue));
          setspinner(true);
          const result = await ipfs.add(getUserLogo);
          let path = `https://skywalker.infura-ipfs.io/ipfs/${result.path}`;
          let value = webSupply.utils.toWei(
            getUserData.MinimumDeposit.toString()
          );

          const { request } = await prepareWriteContract({
            address: SEFO_staking_Address,
            abi: SEFO_staking_Abi,
            functionName: "createPool",
            args: [
              getUserData.StakednftAddress,
              LockableDays,
              getUserData.StakedtokenAddress,
              path,
              value,
              Boolean(selectedValue),
              getUserData.Apy,
            ],
            account: address,
          });
          const { hash } = await writeContract(request);
          const data = await waitForTransaction({
            hash,
          });
       
          Swal.fire("Poll Created", "Successfully", "success");
          setspinner(false);
          history("/")

        } else {
          toast.error("Connect Wallet First!");
          setspinner(false);
        }
      } else {
        toast.error("Please Upload File First");
        setspinner(false);
      }
    } catch (error) {
      console.log(error);
      setspinner(false);
    }
  };
  useEffect(()=>{
    if (window.location.href.includes("Pool_ID")){

      let Useraccess = window.location.href.split("&&");
      Useraccess = Useraccess[Useraccess.length - 1];
      // console.log("User_Token",Useraccess);
      // setPool_Id(parseInt(Number(Useraccess)))
      // setUser_token(Useraccess)
      // setrobotShoww(true);
    }
  },[])
  const EditPoll = async () => {
    try {
      if (address) {
       
        setspinner(true);
        let path =null
        let Useraccess=null
        if (window.location.href.includes("Pool_ID")){

           Useraccess = window.location.href.split("&&");
          let DataUseraccess = Useraccess[Useraccess.length - 1];
          DataUseraccess = DataUseraccess.split("=");
          DataUseraccess = DataUseraccess[DataUseraccess.length - 1];
          Useraccess=DataUseraccess
          // console.log("DataUseraccess",DataUseraccess);

          // console.log("User_Token",Useraccess);
          // setPool_Id(parseInt(Number(Useraccess)))
          // setUser_token(Useraccess)
          // setrobotShoww(true);
        }
     
        if(getUserLogo){

          const result = await ipfs.add(getUserLogo);
           path = `https://skywalker.infura-ipfs.io/ipfs/${result.path}`;
        }
        let value = webSupply.utils.toWei(
          getUserData.MinimumDeposit.toString() || Editdata.minimumDeposit.toString()
          );
          console.log("Path",path,"getUserData",Useraccess);

        const { request } = await prepareWriteContract({
          address: SEFO_staking_Address,
          abi: SEFO_staking_Abi,
          functionName: "editPool",
          args: [
            Useraccess.toString(),
            getUserData.StakednftAddress || Editdata.StakednftAddress ,
            LockableDays || Editdata.lockableDays,
            getUserData.StakedtokenAddress ||  Editdata.StakedtokenAddress,
            path ||Editdata.poolLogo,
            value,
            Boolean(selectedValue) || Editdata.isStarted,
            getUserData.Apy ||  Editdata.apy,
          ],
          account: address,
        });
        const { hash } = await writeContract(request);
        const data = await waitForTransaction({
          hash,
        });
        // await nftContractOf.methods
        //   .createPool(
        //     getUserData.StakednftAddress,
        //     LockableDays,
        //     getUserData.StakedtokenAddress,
        //     path,
        //     // getUserData.MinimumDeposit,
        //     web3.utils.toWei(getUserData.MinimumDeposit.toString()),
        //     selectedValue,
        //     getUserData.Apy
        //   )
        //   .send({
        //     from: acc,
        //   });
        Swal.fire("Poll Edit", "Successfully", "success");
        setspinner(false);
        history("/")
      } else {
        toast.error("Connect Wallet First!");
        setspinner(false);
      }
    } catch (error) {
      console.log(error);
      setspinner(false);

    }
  };

  return (
    <div>
      <div className="flex justify-between md:justify-start items-center">
        <div className="flex items-center">
          {/* <img src={logo} alt="logo" className="w-20 h-20 md:w-28 md:h-28" /> */}

          <div className="ml-2 md:ml-4">
            <h1 className="font-medium text-xl md:text-3xl">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-2">Upload NFT</p>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:justify-between">
        <div className="col-lg-6 lg:w-[30.125rem]">
          <div class="mb-6 mt-10">
            <label
              for="item-name"
              class="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              StakednftAddress <span class="text-red">*</span>
            </label>
            <input
              type="text"
              id="item-name"
              class="w-full rounded-lg border border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 bg-[#111111] p-5 dark:placeholder:text-jacarta-300"
              placeholder="StakednftAddress"
              required
              name="StakednftAddress"
              onChange={handleGet}
              defaultValue={Editdata?.StakednftAddress}
            />
          </div>
          <div class=" my-1 cursor-pointer">
            <label
              for="item-name"
              class="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              LockableDays <span class="text-red">*</span>
            </label>
            <div class="mb-6 flex flex-wrap items-center justify-between">
              <ul class="flex flex-wrap items-center">
                <li class="my-1 mr-2.5">
                  <a
                    onClick={() => setLockableDays(30)}
                    className={`${
                      LockableDays == 30 ? "border" : ""
                    } group flex h-9 items-center rounded-lg  border-jacarta-100 bg-[#111111] px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors  hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark: dark:hover:bg-accent dark:hover:text-white`}
                  >
                    <span>30 Days</span>
                  </a>
                </li>
                <li class="my-1 mr-2.5">
                  <a
                    onClick={() => setLockableDays(40)}
                    className={`${
                      LockableDays == 40 ? "border" : ""
                    } group flex h-9 items-center rounded-lg  border-jacarta-100 bg-[#111111] px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors  hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark: dark:hover:bg-accent dark:hover:text-white`}
                  >
                    <span>40 Days</span>
                  </a>
                </li>
                <li class="my-1 mr-2.5">
                  <a
                    onClick={() => setLockableDays(60)}
                    className={`${
                      LockableDays == 60 ? "border" : ""
                    } group flex h-9 items-center rounded-lg  border-jacarta-100 bg-[#111111] px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors  hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark: dark:hover:bg-accent dark:hover:text-white`}
                  >
                    <span>60 Days</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6">
            <label
              for="item-name"
              class="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              StakedtokenAddress<span class="text-red">*</span>
            </label>
            <input
              type="text"
              id="item-name"
              class="w-full border rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 bg-[#111111] p-5 dark:placeholder:text-jacarta-300"
              placeholder="StakedtokenAddress"
              required
              name="StakedtokenAddress"
              onChange={handleGet}
              defaultValue={Editdata?.StakedtokenAddress}
            />
          </div>
          <div class="mb-6">
            <label
              for="item-name"
              class="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              MinimumDeposit<span class="text-red">*</span>
            </label>
            <input
              type="text"
              id="item-name"
              class="w-full rounded-lg border border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 bg-[#111111] p-5 dark:placeholder:text-jacarta-300"
              placeholder="MinimumDeposit"
              required
              name="MinimumDeposit"
              onChange={handleGet}
              defaultValue={ Editdata !=null?  webSupply.utils.fromWei(Editdata?.minimumDeposit.toString()):"" }
            />
          </div>

          <div class="mb-4 d-flex">
            <label
              for="item-name"
              class="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              IsStarted<span class="text-red">*</span>
            </label>
            <div class="mb-8 flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedValue}
                    defaultValue={Editdata?.isStarted}
                    onChange={handleChange}
                  >
                    <a
                      className={`group flex h-9 items-center rounded-lg  border-jacarta-100 bg-[#111111] px-4  me-2 font-display text-sm font-semibold text-jacarta-500 transition-colors  hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark: dark:hover:bg-accent dark:hover:text-white ${
                        selectedValue === true ? "border" : ""
                      } `}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="True"
                      />
                    </a>
                    <a
                      className={`group flex h-9 items-center rounded-lg  border-jacarta-100 bg-[#111111] px-4  me-2 font-display text-sm font-semibold text-jacarta-500 transition-colors  hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark: dark:hover:bg-accent dark:hover:text-white ${
                        selectedValue === false ? "border" : ""
                      } `}
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="False"
                      />
                    </a>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <label
              for="item-name"
              class="mb-2 block font-display text-jacarta-700 dark:text-white"
            >
              Apy <span class="text-red">*</span>
            </label>
            <input
              type="text"
              id="item-name"
              class="w-full rounded-lg border border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 bg-[#111111] p-5 dark:placeholder:text-jacarta-300"
              placeholder="Enter Apy"
              required
              name="Apy"
              onChange={handleGet}
              defaultValue={Editdata?.apy}
            />
          </div>
        </div>
        <div className="col-lg-6  ">
          <div className="Upload_img">
            <div className="">
              <div className="mx-auto lg:w-[20.125rem] ">
                <div className="mb-6 mt-5  ">
                  <p className="mb-3 text-2xs dark:text-jacarta-300">
                    Choose your file to upload
                  </p>

                  <div
                    className={`group relative flex max-w-md flex-col items-center justify-center
                     rounded-lg border-2 border-dashed border-jacarta-100 bg-[#111111] 
                     text-center dark:border-jacarta-600 dark:bg-jacarta-700 ${
                       getUserLogo == null ? "py-20 px-5 " : "py-0 px-0 "
                     } `}
                  >
                    {getUserLogo == null && Editdata?.poolLogo == undefined ? (
                      <>
                        <div className="relative z-10 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mb-4 inline-block fill-jacarta-500 fill-white"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                          </svg>
                          <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                            JPG, PNG, GIF. Max size: 100 MB
                          </p>
                        </div>
                        <div
                          className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0
                       group-hover:opacity-100 dark:bg-jacarta-600"
                        ></div>
                        <input
                          type="file"
                          accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
                          id="file-upload"
                          className="absolute inset-0 z-20 cursor-pointer opacity-0"
                          onChange={(e) => setgetUserLogo(e.target.files[0])}
                        />
                      </>
                    ) : (
                      <>
                      <div className="relative z-10 cursor-pointer">
                      <img
                          src={
                            Editdata?.poolLogo != undefined && getUserLogo == null
                              ? Editdata?.poolLogo
                              : URL?.createObjectURL(getUserLogo)
                          }
                          alt=""
                        />
                        </div>
                        <div
                          className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0
                       group-hover:opacity-100 dark:bg-jacarta-600"
                        ></div>
                        <input
                          type="file"
                          accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
                          id="file-upload"
                          className="absolute inset-0 z-20 cursor-pointer opacity-0"
                          onChange={(e) => setgetUserLogo(e.target.files[0])}
                        />
                        {/* <img
                          src={
                            Editdata?.poolLogo != undefined
                              ? Editdata?.poolLogo
                              : URL?.createObjectURL(getUserLogo)
                          }
                          alt=""
                        /> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="px-4 lg:px-6 py-2 mb-5 home-table-view cursor-pointer"
        onClick={() => (Editdata !=null? EditPoll() : CreatePool())}
      >
        {spinner ? (
          <>
            {" "}
            <ScaleLoader
              color="#fff"
              // loading={loading}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </>
        ) : (
          <>{Editdata !=null? "Edit Pool" : "Create Pool"}</>
        )}
        
      </button>
   
    </div>
  );
}
