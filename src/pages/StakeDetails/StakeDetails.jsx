import PlatformStakeDetails from "../../components/StakeDetails/PlatformStakeDetails";
import StakeHeader from "../../components/StakeDetails/StakeHeader";
import StakeHelp from "../../components/StakeDetails/StakeHelp";

const StakeDetails = () => {
  return (
    <main className="mx-auto max-w-7xl p-4">
      <section>
        <StakeHeader />
      </section>

      <section>
        <PlatformStakeDetails />
      </section>

      <section className="mt-16 px-2 md:px-12">
        <StakeHelp />
      </section>
    </main>
  )
}
export default StakeDetails