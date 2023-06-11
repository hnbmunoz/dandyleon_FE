import React, {useEffect} from "react";
import AdminWidget from "./AdminWidget";
import PanelHolder from "./AdminPanels/PanelHolder";
import PanelSection from "./AdminPanels/PanelSection";
import CategoryPanel from "./AdminPanels/Panels/CategoryPanel";
import ProductPanel from "./AdminPanels/Panels/ProductPanel";
import TransactionPanel from "./AdminPanels/Panels/TransactionPanel";
import { useAdminNavigation } from "../../store/adminStore/useAdminNavigation";

interface dummy {
  show: string;
}

const DummmyPanel = ({ show }: dummy) => {
  return <div>{show}</div>;
};

const AdminPanel = () => {

  const { defaultPanel } = useAdminNavigation()

  return (
    <div className="admin-container">
      <div className="admin-panel">
        <AdminWidget />
      </div>

      <PanelHolder panelIdx={0}>
        <PanelSection color="transparent">          
          <TransactionPanel />
        </PanelSection>
        <PanelSection color="transparent">
          {defaultPanel === 1 && <CategoryPanel />}
        </PanelSection>
        <PanelSection color="transparent">
          {defaultPanel === 2 && <ProductPanel />}
          {/* <DummmyPanel show="Products Panel" /> */}
        </PanelSection>
        <PanelSection color="transparent">
          <DummmyPanel show="Administration Panel" />
          {/* <DummmyPanel show="Transaction Panel" /> */}
        </PanelSection>
        {/* <PanelSection color="transparent">
          <DummmyPanel show="Reports Panel" />
        </PanelSection>
        <PanelSection color="transparent">
          <DummmyPanel show="Clients Panel" />
        </PanelSection> */}
      </PanelHolder>
    </div>
  );
};

export default AdminPanel;
