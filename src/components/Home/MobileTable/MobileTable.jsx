import { Link } from "react-router-dom"

import homeTableData from "../../../assets/data/homeTable"

const MobileTable = () => {
  return (
    <div className="space-y-10">
      {homeTableData.map((data, index) => (
          <div className="flex items-center uppercase" key={index}>
            <div className="bg-[#232323] grid grid-rows-5 w-[10rem]">
              <div className="row-span-1 h-20 flex justify-end items-center pr-4">Name</div>
              <div className="row-span-1 flex justify-end items-center pr-4">Base APR</div>
              <div className="row-span-1 flex justify-end items-center pr-4">staked</div>
              <div className="row-span-1 flex justify-end items-center pr-4">tvl</div>
              <div className="row-span-1 flex justify-end items-center pr-4">pools</div>

            </div>

                <div className="bg-[#111111] grid grid-rows-5 w-full space-x-6">
                  <div className="row-span-1 flex items-center">
                    <img src={data.icon} alt="logo" className="w-20 h-20 mr-3 pt-4" />

                    <div className="flex flex-col pt-4">
                      <span className="text-base font-semibold">{data.name.title}</span>
                      <span className="mt-2 text-gray-400">{data.name.desc}</span>
                    </div>
                  </div>

                  <div className="row-span-1 flex items-center">{data.apr}%</div>
                  <div className="row-span-1 flex items-center">{data.staked}</div>
                  <div className="row-span-1 flex items-center">${data.tvl}</div>

                  <div className="row-span-1 flex items-center">
                    {data.view && (
                      <Link className="px-4 lg:px-6 py-0.5 home-table-view cursor-pointer"
                        to="/stake/1" // TODO: change to dynamic link
                      >
                        <span className="text-xs">View</span>
                      </Link>
                    )}
                  </div>
                </div>
          </div>
      ))}
    </div>
  )
}
export default MobileTable