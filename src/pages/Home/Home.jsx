import { useEffect, useState } from "react";
import DesktopTable from "../../components/Home/DesktopTable";
import MobileTable from "../../components/Home/MobileTable";

import "../../styles/home.css";
import { toast } from "react-hot-toast";
import { SEFO_staking_Abi, SEFO_staking_Address } from "../../utils/Contract";
import { useSelector } from "react-redux";
import Web3 from "web3";

const Home = () => {
  const [poll_Array, setpoll_Array] = useState([]);
  const webSupply = new Web3("https://endpoints.omniatech.io/v1/eth/sepolia/public");


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
      setpoll_Array(newArray)

      // console.log("newArray", newArray);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    pools();
  }, []);

  return (
    <main>
      <section className="hidden lg:block p-16 lg:p-24 max-w-7xl mx-auto">
        <DesktopTable  poll_Array={poll_Array} admin={false} />
      </section>

      <section className="lg:hidden py-4 max-w-xl mx-auto">
        <MobileTable poll_Array={poll_Array}  admin={false} />
      </section>
    </main>
  );
};
export default Home;
