import website from "../../../assets/images/global/socials/website.svg";
import telegram from "../../../assets/images/global/socials/telegram.svg";
import logo from "../../../assets/images/global/logo.svg";
import text_left from "../../../assets/images/footer/text_left.svg";
import text_right from "../../../assets/images/footer/text_right.svg";

const Footer = () => {
  return (
    <div className="relative">

        <div className="flex justify-center z-10 ">
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center pt-2 md:pt-5">
                    <img src={text_left} className="w-12 h-12 mr-6" />
                    <span className="text-white text-xs font-bold uppercase">SAFO Links</span>
                    <img src={text_right} className="w-12 h-12 ml-6" />
                </div>

                <div>
                    <img src={logo} className="w-14 h-14 md:w-24 md:h-24" />
                </div>

                <div className="flex items-center md:pb-5">
                    <img src={website} className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-4 cursor-pointer" 
                        onClick={() => window.open("https://safeonechain.com", "_blank")}
                    />
                    <img src={telegram} className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-4 cursor-pointer" 
                        onClick={() => window.open("https://t.me/SafeOnechain", "_blank")}
                    />
                </div>

                <div className="flex items-center py-3 md:pb-14 md:pt-8">
                    <span className="text-gray-400 text-xs">Copyright © 2023. All Rights Reserved SAFO</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Footer