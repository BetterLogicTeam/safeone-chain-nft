import { useState } from "react";

import WalletConnection from "../../Modals/WalletConnection";

import { HiMenuAlt3 } from "react-icons/hi";
import { FaWallet } from "react-icons/fa";

import logo from "../../../../assets/images/global/logo.svg";

import { useLayoutContext } from "../../../../LayoutContext";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "../../../../store/actions/logout";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

const styles = {
  button:
    "flex items-center bg-transparent py-1 px-2 xs:py-2 xs:px-4 md:py-2 md:px-6 uppercase text-xs font-bold",
};

const NavBar = () => {
  const { setMobileOpen } = useLayoutContext();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const dispatch = useDispatch();

  const diconnectWallet = async () => {
    if (providerType == 1) {
      await provider.disconnect();
    }
    dispatch(disconnectWallet());
  };

  const handleModalOpen = () => {
    setOpenWalletModal(true);
  };

  const handleModalClose = () => {
    setOpenWalletModal(false);
  };

  return (
    <>
      <WalletConnection
        open={openWalletModal}
        handleModalClose={handleModalClose}
      />

      <div className="flex justify-between items-center z-10 px-4 py-5 md:p-5 md:py-2">
        <div className="flex items-center">
          <img src={logo} className="w-9 h-9 xs:w-11 xs:h-11 mr-4" />
          <span className="text-white text-lg font-bold hidden md:block">
            SAFO
          </span>
        </div>

        <div className="flex justify-end items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <button
                type="button"
                className={`${styles.button} border-2 border-[#393941] text-white`}
                onClick={() => console.log("clicked")}
              >
                Network
              </button>
            </div>

            <div>
              <button
                type="button"
                className={`${styles.button} bg-white`}
                onClick={() =>
                  address
                    ? chain?.id == chains[0]?.id
                      ? open()
                      : switchNetwork?.(chains[0]?.id)
                    : open()
                }
                // onClick={()=>(acc ? diconnectWallet():handleModalOpen())}
                // onClick={() => open()}
              >
                {/* {
                  acc ? <>{`${acc.substring(0, 6)}...${acc.substring(acc.length - 4)}`}</> : <><FaWallet className="mr-2" />
                  <span>Connect</span>
                  </>
                } */}
                {/* <FaWallet className="mr-2" />
                  <span>Connect</span> */}

                {address ? (
                  chain?.id == chains[0]?.id || chain?.id == chains[1]?.id ? (
                    address ? (
                      <>
                        {`${address.substring(0, 6)}...${address.substring(
                          address.length - 4
                        )}`}
                      </>
                    ) : (
                      "connect wallet"
                    )
                  ) : (
                    "Switch NewWork"
                  )
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center">
            <HiMenuAlt3
              className="text-white text-2xl ml-4 cursor-pointer"
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
