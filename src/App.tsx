import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from 'axios'
import { toast } from "react-toastify";

import AuthenticationModal from "./components/widgets/authentication/AuthenticationModal";
import Sales from "./components/pages/sales";
import CartInterface from "./components/widgets/cart/CartInterface";
import Header from "./components/header/Header";
import Blur from "./components/pages/Blur";
import PopUp from "./components/widgets/popup";
import Loaders from "./components/loaders";
import AdminDashboard from "./components/pages/AdminDashboard";
import AdminButton from "./components/pages/AdminDashboard/AdminButton";

import { useAuthenticationStore } from "./components/store/widgetStore/useAuthenticationStore";
import { useBlurStore } from "./components/store/blurStore/useBlurStore";
import { useLoaderStore } from "./components/store/loaderStore/useLoaderStore";
import { userProfileStore } from "./components/store/profileStore/useProfileStore";
import { useAdminView } from "./components/store/adminStore/useAdminView";
import { usePopUpStore } from "./components/store/popupStore/usePopUpStore";
import { useCategoryStore } from "./components/store/useCategoryStore/useCategoryStore";
import { useProductStore } from "./components/store/useProductStore/useProductStore";
import { useTransactionStore } from "./components/store/useTransactionStore/useTransactionStore";
import { useOrderStore } from "./components/store/orderStore/userOrderStore";

interface displayProfile {
  display: string;
  is_admin: boolean;
}


const App = () => {
  const { displayAuthentication } = useAuthenticationStore();
  const { loading, showLoading, hideLoading } = useLoaderStore();
  const { toBlur, hideBlur} = useBlurStore();
  const { profile } = userProfileStore();
  const { categoryList, loadCategory } = useCategoryStore();
  const { productList, loadProduct } = useProductStore();  
  const { updateTransaction } = useTransactionStore();
  const { displayPopUp, showPopUp, hidePopUp } = usePopUpStore()
  
  const { toAdmin, showAdminDashboard, hideAdminDashboard } = useAdminView();
  
  const [userProfile, setUserProfile] = useState<displayProfile>({
    display: "",
    is_admin: false
  });
 
  useEffect(() => {
    // monitor this useEffect hook
    !_.isEmpty(profile) && setUserProfile(profile);
    return () => {};
  });

  const handleDisplayPage = () => {
    toAdmin ? hideAdminDashboard() : showAdminDashboard();
  }

  const handleClosePopUp = async() => {
    await document.getElementById('main-blur')?.classList.add('force-transparent')
    await document.querySelector('.pop-up-modal')?.classList.add('fade-out')
    setTimeout(hidePopUp, 450)
    setTimeout(hideBlur, 450)
  }

  useEffect(() => {
    LoadAllCategories()
    LoadAllProducts()
    LoadAllTransactions()
    return () => {  
    }
  }, [toAdmin])

  const LoadAllTransactions = async() => {
    await showLoading()
    await axios({
      method: "get",
      url: "/api/v2/transactions",
      headers: {
        token: profile.token
      },
      data: {},
    })
      .then(({data}: any) => {
        hideLoading();      
        updateTransaction(data.data)      
      })
      .catch((ex: any) => {
        hideLoading();        
        // toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
      });

    await hideLoading()
  }

  const LoadAllProducts = async() => {
    await showLoading()
    await axios({
      method: "get",
      url: "/api/v2/products",
      headers: {},
      data: {},
    })
      .then(({data}: any) => {
        hideLoading();      
        loadProduct(data.data)      
      })
      .catch((ex: any) => {
        hideLoading();        
        // toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
      });

    await hideLoading()
  }

 
  const LoadAllCategories = async() => {
    await showLoading()
    await axios({
      method: "get",
      url: "/api/v2/categories",
      headers: {},
      data: {},
    })
      .then(({data}: any) => {
        hideLoading();      
        loadCategory(data.data)      
      })
      .catch((ex: any) => {
        hideLoading();        
        // toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
      });

    await hideLoading()
  }
 
  return (
    <div className="app">
      <CartInterface />
      {toBlur && <Blur />}         
      <Header />      
      { !_.isEmpty(profile) && userProfile.is_admin && <AdminButton buttonClick={handleDisplayPage}/>  }         
      {displayAuthentication && <AuthenticationModal />}
      {loading && <Loaders />}
      <div 
        style={{
          width: '100%',          
          height: '100vh',
          display: 'flex',
          justifyContent:'center',
          position: 'absolute',
          zIndex: `${toBlur ? "10" : "-1"}`
        }}
      >
      {displayPopUp && <PopUp closeWidget={handleClosePopUp}/>}
      </div>
      {toAdmin ? <AdminDashboard /> : <Sales />} 
      
    </div>
  );
};

export default App;
