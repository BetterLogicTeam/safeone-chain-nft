import { IoIosCopy } from 'react-icons/io';

const styles = {
  divContainer: 'flex flex-col justify-center',
  gridContainer: 'grid grid-cols-12 xl:grid-cols-10 gap-6',
  gridSubContainer: 'col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-2',
  gridSubContainer2: 'col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-2',
  detailsContainer: {
    container: 'p-4 border border-border rounded-3xl uppercase',
    title: 'text-sm text-gray-400',
    value: 'font-medium  tracking-wider mt-5',
    value2: 'text-sm lg:text-base mt-2'
  },
}

const PlatformStakeDetails = () => {
  return (
    <>
      <div className={`${styles.gridContainer}`}>
        <div className={`${styles.detailsContainer.container} ${styles.gridSubContainer} ${styles.divContainer}`}>
          <span className={`${styles.detailsContainer.title}`}>Base apr</span>
          <span className={`${styles.detailsContainer.value}`}>49%</span>
        </div>

        <div className={`${styles.detailsContainer.container} ${styles.gridSubContainer} ${styles.divContainer}`}>
          <span className={`${styles.detailsContainer.title}`}>Multiplier</span>
          <span className={`${styles.detailsContainer.value}`}>2<span className="lowercase">x</span></span>
        </div>

        <div className={`${styles.detailsContainer.container} ${styles.gridSubContainer} ${styles.divContainer}`}>
          <span className={`${styles.detailsContainer.title}`}>SAFO</span>
          <span className={`${styles.detailsContainer.value}`}>19%</span>
        </div>

        <div className={`${styles.detailsContainer.container} ${styles.gridSubContainer} ${styles.divContainer}`}>
          <span className={`${styles.detailsContainer.title}`}>USDT</span>
          <span className={`${styles.detailsContainer.value}`}>13%</span>
        </div>

        <div className={`${styles.detailsContainer.container} ${styles.gridSubContainer} ${styles.divContainer}`}>
          <span className={`${styles.detailsContainer.title}`}>Tvl</span>
          <span className={`${styles.detailsContainer.value}`}>$1,238</span>
        </div>
      </div>

      <div className={`mt-12 px-2 md:px-12`}>
        <div className={`bg-[#111111] p-4 rounded-md grid grid-cols-20 gap-y-4 lg:gap-y-0`}>
          <div className={`col-span-full md:col-span-12 lg:col-span-3 ${styles.divContainer}`}>
            <span className={`${styles.detailsContainer.title}`}>Duration</span>
            <span className={`${styles.detailsContainer.value2} text-yellow`}>90 Days</span>
          </div>

          <div className={`col-span-full md:col-span-8 lg:col-span-3 ${styles.divContainer}`}>
            <span className={`${styles.detailsContainer.title}`}>remaining dats</span>
            <span className={`${styles.detailsContainer.value2} text-blue`}>39 days</span>
          </div>

          <div className={`col-span-full md:col-span-12 lg:col-span-9 xl:col-span-7 ${styles.divContainer}`}>
            <span className={`${styles.detailsContainer.title}`}>contract</span>
            <div className={`${styles.detailsContainer.value2} flex items-center`}>0x43445754642fws3gf454y23dfu57<span className='cursor-pointer ml-2 xl:ml-3'><IoIosCopy /></span></div>
          </div>

          <div className={`col-span-full md:col-span-8 lg:col-span-3 ${styles.divContainer}`}>
            <span className={`${styles.detailsContainer.title}`}>token staked</span>
            <span className={`${styles.detailsContainer.value2}`}>124,238</span>
          </div>

          <div className={`col-span-full md:col-span-10 lg:col-span-4 ${styles.divContainer}`}>
            <span className={`${styles.detailsContainer.title}`}>rewards earned</span>
            <span className={`${styles.detailsContainer.value2}`}>29,038</span>
          </div>

        </div>
      </div>
    </>    
  );
};
export default PlatformStakeDetails;
