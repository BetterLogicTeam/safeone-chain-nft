import { useEffect } from "react";

// Component Import
import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import WebFont from "webfontloader";

// Pages Import
import Home from "./pages/Home";
import StakeDetails from "./pages/StakeDetails/StakeDetails";
import NotFound from "./pages/NotFound";
import "./styles/index.css";
import "./styles/home.css";



// Error or Success Notification
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Context Import
import { LayoutProvider } from "./LayoutContext";
import toast, { Toaster } from 'react-hot-toast';
import Admin_Panel from "./components/Admin_panel/Admin_Panel";
import { SEFO_staking_Address } from "./utils/Contract";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:100,200,300,400,500,600,700,800,900']
      },
    });
  }, []);
  return (
    <div className="App">
      
      <LayoutProvider>
        <Toaster />
        <Layout>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stake/:id" element={<StakeDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Admin_Panel" element={<Admin_Panel />} />

          </Routes>

        </Layout>
      </LayoutProvider>
    </div>
  );
}

export default App;
