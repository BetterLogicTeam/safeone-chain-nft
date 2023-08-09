import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

// Data
import headerData from "../../../../assets/data/header";

// Context
import { useLayoutContext } from "../../../../LayoutContext";

const SideBar = () => {
  const { active, setActive } = useLayoutContext();

  return (
    <div className={``} >

      <ul className="py-3">
      {headerData.map((header, index) => (
            <Link
                key={index}
                className={`flex rounded-md p-2 cursor-pointer text-lg items-center gap-x-4 mt-2 ${active === index && 'p-2 rounded-sm font-medium text-black bg-white'}`}
                to={header.link}
                target={header.link.includes("http") ? "_blank" : "_self"}
                onClick={() => setActive(index)}
            >
                <span className={`flex items-center gap-x-2 pl-3`}>
                    <span className={`${active === index ? 'block' : 'hidden'}`}>
                        <AiOutlineRight className={`text-black text-2xl`} />
                    </span> {header.title}
                </span>
            </Link>
        ))}
      </ul>

    </div>
  );
};

export default SideBar;