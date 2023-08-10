import { Link, useNavigate, useNavigation } from "react-router-dom";

import homeTableData from "../../../assets/data/homeTable";

const styles = {
  tableLayout:
    "grid grid-cols-12 uppercase text-xs text-gray-100 font-medium border-[1px] border-border",
};

const { tableLayout } = styles;

const DesktopTable = ({ poll_Array }) => {

  let history=useNavigate()
  return (
    <>
      <div className={`${tableLayout} p-2 rounded-t-md`}>
        <div className="col-span-4">Name</div>
        <div className="col-span-2">Base APR</div>
        <div className="col-span-2">staked</div>
        <div className="col-span-2">tvl</div>
        <div className="col-span-2">pools</div>
      </div>

      {poll_Array.map((data, index) => (
        <div
          className={`${tableLayout} border-t-0 rounded-b-md p-6 bg-[#111111]`}
          key={index}
        >
          <div className="col-span-4 flex items-center">
            <img src={data.poolLogo} alt="logo" className="w-10 h-10 mr-2" />

            <div className="flex flex-col">
              <span className="text-base">SAFO</span>
              <span className="mt-2 text-gray-400">NFT Staking</span>
            </div>
          </div>
          <div className="col-span-2 flex items-center">{data.apy}%</div>
          <div className="col-span-2 flex items-center">15</div>
          <div className="col-span-2 flex items-center">$6</div>
          <div className="col-span-2 flex items-center">
            <div
              className="px-4 lg:px-6 py-0.5 home-table-view cursor-pointer"
              // to="/stake/1" // TODO: change to dynamic link
              onClick={()=>history(`/stake/${index+1}`,{state:data})}
            >
              <span className="text-xs" >View</span>
            </div>
            {/* {data.view && (
                            <Link className="px-4 lg:px-6 py-0.5 home-table-view cursor-pointer"
                                to="/stake/1" // TODO: change to dynamic link
                            >
                                <span className="text-xs">View</span>
                            </Link>
                        )} */}
          </div>
        </div>
      ))}
    </>
  );
};
export default DesktopTable;
