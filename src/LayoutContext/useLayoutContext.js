import { useContext } from "react";
import LayoutContext from "./LayoutContext";

const useLayoutContext = () => useContext(LayoutContext);

export default useLayoutContext;