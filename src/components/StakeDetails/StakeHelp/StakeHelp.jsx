import { useState } from "react";
import logo from "../../../assets/images/global/logo.svg";
import ModalTypeOne from "../../common/Modals/ModalTypeOne";
import TokenStakeUnstakeModal from "../../common/Modals/TokenStakeUnstakeModal";
import NftUnstake from "../../common/Modals/NftUnstake";
import HelpModal from "../../common/Modals/HelpModal";

const StakeHelp = () => {
    const [modalTypeOneController, setModalTypeOneController] = useState({status: false, heading: '', button: '', type: ''});
    const [modalTypeStakeController, setModalTypeStakeController] = useState({status: false, heading: '', button: '', type: ''});
    const [nftUnstake, setNftUnstake] = useState(false);
    const [helpModal, setHelpModal] = useState(false);

    const closeModal = (modal) => {
        switch (modal) {
            case 'nftSeriesModal':
            case 'stakeNftModal':
            case 'emergencyAllModal':
                setModalTypeOneController({status: false, heading: '', button: '', type: ''});
                break;
            case 'tokenStakeModal':
            case 'tokenUnstakeModal':
                setModalTypeStakeController({status: false, heading: '', button: '', type: ''});
                break;
            default:
                break;
        }
    };

  return (
    <>
        <ModalTypeOne 
            closeModal={closeModal}
            nftSeriesModal={modalTypeOneController}
            // pass a function to set the button inside this component
        />

        <TokenStakeUnstakeModal 
            closeModal={closeModal}
            modalTypeStakeController={modalTypeStakeController}
        />

        <NftUnstake
            isOpen={nftUnstake}
            closeModal={() => setNftUnstake(false)}
        />

        <HelpModal
            isOpen={helpModal}
            closeModal={() => setHelpModal(false)}
        />

        <div className="bg-[#111111] text-black font-medium rounded-lg pb-6">
            <div className="p-4 px-12 md:px-0 rounded-md flex flex-col items-center md:flex-row md:justify-between max-w-3xl mx-auto text-sm uppercase gap-16">
                <div className="flex flex-col items-center text-center space-y-6 w-full">
                    <div className="container-yellow py-2 px-12 w-full cursor-pointer"
                        onClick={() => {
                            setModalTypeOneController({
                                status: true,
                                heading: 'NFT Series',
                                button: 'SAFO',
                                type: 'nftSeriesModal'
                            });
                        }}
                    >
                        NFT Series
                    </div>

                    <div className="container-yellow py-2 w-full cursor-pointer"
                        onClick={() => {
                            setModalTypeOneController({
                                status: true,
                                heading: 'Stake NFT',
                                button: '+',
                                type: 'stakeNftModal'
                            });
                        }}
                    >
                        Stake NFT
                    </div>

                    <div className="container-yellow py-2 w-full cursor-pointer"
                        onClick={() => setModalTypeStakeController({
                            status: true,
                            heading: 'Token Stake',
                            button: 'stake',
                            type: 'tokenStakeModal'
                        })}
                    >
                        Token Stake
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-10 w-full">
                    <img src={logo} alt="logo" className="w-20 h-20" />

                    <div className="container-blue py-2 w-full cursor-pointer"
                        onClick={() => setHelpModal(true)}
                    >
                        Help
                    </div>

                    <div className="container-blue py-2 w-full cursor-pointer">
                        Buy NFTs
                    </div>

                    <div className="container-blue py-2 w-full cursor-pointer">
                        But Tokens
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-6 w-full">
                    <div className="container-yellow py-2 w-full cursor-pointer"
                        onClick={() => setNftUnstake(true)}
                    >
                        NFT Unstake
                    </div>

                    <div className="container-yellow py-2 w-full cursor-pointer"
                        onClick={() => setModalTypeStakeController({
                            status: true,
                            heading: 'Token Unstake',
                            button: 'unstake',
                            type: 'tokenUnstakeModal'
                        })}
                    >
                        Token untake
                    </div>

                    <div className="container-yellow py-2 w-full cursor-pointer"
                        onClick={() =>
                            setModalTypeOneController({
                                status: true,
                                heading: 'Emergency All',
                                button: 'unstake all tokens & nfts',
                                type: 'emergencyAllModal'
                            })
                        }
                    >
                        Emergency All
                    </div>
                </div>
            </div>
        </div>

        <div className="my-8 flex justify-center items-center">
            <div className="container-yellow py-2 px-10 uppercase text-black text-sm cursor-pointer">Harvest</div>
      </div>
    </>
  )
}
export default StakeHelp