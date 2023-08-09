import logo from "../../../assets/images/global/logo.svg";

const Header = () => {
  return (
    <div className="flex justify-between md:justify-start items-center">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-20 h-20 md:w-28 md:h-28" />

        <div className="ml-2 md:ml-4">
          <h1 className="font-medium text-xl md:text-3xl">SAFO</h1>
          <p className="text-sm text-gray-400 mt-2">NFT STAKING</p>
        </div>
        
      </div>
    </div>
  )
}
export default Header