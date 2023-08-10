
import { useState } from "react";
import PlatformStakeDetails from "../../components/StakeDetails/PlatformStakeDetails";
import StakeHeader from "../../components/StakeDetails/StakeHeader";
import StakeHelp from "../../components/StakeDetails/StakeHelp";

import { useLocation, useParams } from "react-router-dom";

const StakeDetails = () => {
  
  let history=useLocation()
  let {id}=useParams()
 
  const [poolData, setpoolData] = useState(history.state)

  // setpoolData(history.state)
  // console.log("history",history.state);
  return (
    <main className="mx-auto max-w-7xl p-4">
      <section>
        <StakeHeader poolData={poolData} />
      </section>

      <section>
        <PlatformStakeDetails poolData={poolData}  />
      </section>

      <section className="mt-16 px-2 md:px-12">
        <StakeHelp poolData={poolData} id={id}  />
      </section>
    </main>
  )
}
export default StakeDetails