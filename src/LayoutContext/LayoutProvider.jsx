import { useState } from "react";
import LayoutContext from "./LayoutContext";

// eslint-disable-next-line react/prop-types
const LayoutProvider = ({ children }) => {
    const [active, setActive] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <LayoutContext.Provider value={{ active, setActive, mobileOpen, setMobileOpen }}>
            {children}
        </LayoutContext.Provider>
    );
};

export default LayoutProvider;