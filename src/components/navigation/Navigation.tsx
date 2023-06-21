import React, { useState, useEffect } from "react";
import CartButton from "../widgets/cart/CartButton";
import { useAuthenticationStore } from "../store/widgetStore/useAuthenticationStore";
import { useBlurStore } from "../store/blurStore/useBlurStore";
import { userProfileStore } from "../store/profileStore/useProfileStore";
import { useAdminView } from "../store/adminStore/useAdminView";
import { useOrderStore } from "../store/orderStore/userOrderStore";
import _ from "lodash";
import { useProductStore } from "../store/useProductStore/useProductStore";
import { useOrderView } from "../store/orderStore/useOrderView";
import { useCartStore } from "../store/cartStore/useCartStore";

interface displayProfile {
  display: string;
}

const Navigation = () => {
  const { showAuthentication } = useAuthenticationStore();
  const { showBlur } = useBlurStore();
  const { profile, clearProfile } = userProfileStore();
  const { hideAdminDashboard } = useAdminView();
  const { hideOrder }= useOrderView()
  const {hideCart } = useCartStore()

  // const [userProfile, setUserProfile] = useState<displayProfile>({
  //   display: "",
  // });

  useEffect(() => {
    // monitor this useEffect hook

    !_.isEmpty(profile) && profile;
    return () => {};
  }, []);

  const showAuthPop = () => {
    showAuthentication();
    hideOrder();
    showBlur();
    hideCart();
  };

  const handleSingout = () => {
    clearProfile()
    hideAdminDashboard()
  }

  return (
    <div className="flex-row" 
      style={{ 
        alignItems: "center",
        position: 'absolute',
        right: '0'
      }}
    >
      <CartButton />
      {/* <div style={{ padding: "0 0.25rem" }}> | </div>      */}
      <div style={{ padding: "0 0.25rem" }}> | </div>
      {(profile.display === "" || _.isEmpty(profile)) ? (
        <div className="auth-login" onClick={showAuthPop}>
          Login
        </div>
      ) : (
        <div className="  flex-row" style={{fontSize: "1.5rem"}}>
          <div>{profile.display}</div> |
          <div className="auth-login" onClick={handleSingout}>Log Out</div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
