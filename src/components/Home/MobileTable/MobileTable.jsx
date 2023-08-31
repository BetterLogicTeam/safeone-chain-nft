import { Link, useNavigate } from "react-router-dom";

import homeTableData from "../../../assets/data/homeTable";

const MobileTable = ({ poll_Array, admin }) => {
  let history = useNavigate();
  return (
    <div className="space-y-10">
      {poll_Array.map((data, index) => (
        <div className="flex items-center uppercase" key={index}>
          <div className="bg-[#232323] grid grid-rows-5 w-[10rem]">
            <div className="row-span-1 h-20 flex justify-end items-center pr-4">
              Name
            </div>
            <div className="row-span-1 flex justify-end items-center pr-4">
              Base APR
            </div>
            <div className="row-span-1 flex justify-end items-center pr-4">
              staked
            </div>
            <div className="row-span-1 flex justify-end items-center pr-4">
              tvl
            </div>
            <div className="row-span-1 flex justify-end items-center pr-4">
              pools
            </div>
          </div>

          <div className="bg-[#111111] grid grid-rows-5 w-full space-x-6">
            <div className="row-span-1 flex items-center">
              <img
                src={data.poolLogo}
                alt="logo"
                className="w-20 h-20 mr-3 pt-4"
              />

              <div className="flex flex-col pt-4">
                <span className="text-base font-semibold">SAFO</span>
                <span className="mt-2 text-gray-400">NFT Staking</span>
              </div>
            </div>

            <div className="row-span-1 flex items-center">{data.apy}%</div>
            <div className="row-span-1 flex items-center">15</div>
            <div className="row-span-1 flex items-center">$16</div>

            <div className="row-span-1 flex items-center">
              <div
                className="px-4 lg:px-6 py-0.5 home-table-view cursor-pointer"
                onClick={() =>
                  admin
                    ? history(`/Admin_Panel/?EditPool&&Pool_ID=${index + 1}`, {
                        state: data,
                      })
                    : history(`/stake/${index + 1}`, { state: data })
                }
              >
                <span className="text-xs"> {admin ? "Edit" : "View"} </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MobileTable;
