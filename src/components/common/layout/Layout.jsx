import Footer from "../Footer";
import BurgerMenu from "../Header/BurgerMenu";
import NavBar from "../Header/NavBar";
import SideBar from "../Header/SideBar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return (
        <div className="flex bg-black font-roboto" id="layout">
            <aside className={`lg:hidden z-20`}>
                <BurgerMenu />
            </aside>

            <div className={`min-h-screen flex flex-col w-full`}>
                <header className={`z-10 border-b-[1px] border-b-border`}>
                    <NavBar />
                </header>

                <div className={`overflow-y-auto w-full flex flex-grow text-white`}>
                    <aside className={`hidden md:flex flex-col shadow-lg sticky top-0 left-0 bottom-0 w-[16rem] z-20 border-r-[1px] border-r-border`}>
                        <SideBar />
                    </aside>

                    <div className="flex flex-col w-full">
                        <div className="flex-grow">
                            {children}
                        </div>

                        <footer className="z-10 w-full mx-auto border-t-[1px] border-t-border">
                            <Footer />
                        </footer>
                    </div>
                </div>
 
            </div>
        </div>
    );
}

export default Layout;