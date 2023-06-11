import React, { useState } from "react";
import MainModals from "../../shared/modals/MainModals";
import { ToastContainer, toast } from "react-toastify";
import { useLoaderStore } from "../../store/loaderStore/useLoaderStore";
import { userProfileStore } from "../../store/profileStore/useProfileStore";
import { useAuthenticationStore } from "../../store/widgetStore/useAuthenticationStore";
import { useBlurStore } from "../../store/blurStore/useBlurStore";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import axios from "axios";

const AuthenticationModal = () => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { overwriteProfile } = userProfileStore();
  const { hideAuthentication } = useAuthenticationStore();
  const { hideBlur } = useBlurStore();

  const [register, setRegister] = useState<boolean>(false);  

  const hidePopup = async() => {
    await document.getElementById('main-blur')?.classList.add('force-transparent')
    await document.querySelector('.transparent-modal')?.classList.add('fade-out')
    setTimeout(hideAuthentication, 450)
    setTimeout(hideBlur, 450)
  };

  const submitVerifyUser = async (userName: string, password: string) => {
    showLoading();
    await axios({
      method: "post",
      url: "/signIn",
      headers: {},
      data: {
        username: userName,
        password: password,
      },
    })
      .then((res: any) => {
        hideLoading();        
        toast.success(res.headers.msg ? res.headers.msg : "");         
        setTimeout(hidePopup, 3000)
        overwriteProfile(res.data);        
      })
      .catch((ex: any) => {
        hideLoading();        
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
      });
  };

  const submitCreateAccount = async (
    fname: string,
    mname: string,
    lname: string,
    email: string,
    displayName: string,
    userName: string,
    password: string
  ) => {
    showLoading();
    await axios({
      method: "post",
      url: "/signUp",
      headers: {},
      data: {
        fname: fname,
        mname: mname,
        lname: lname,
        email: email,
        display_name: displayName,
        username: userName,
        password: password,
        user_type: 2
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        toggleForm()
      })
      .catch((ex: any) => {        
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };

  const toggleForm = () => {
    setRegister(!register)
  }
  return (
    <MainModals>     
      <div className="flex-row">
        <div className={`signIn-container ${!register ? "active" : "inactive"}-sx`}>
          <SignIn
            formSubmit={submitVerifyUser}
            toggleForm={toggleForm}
            closeWidget={hidePopup}
            isRegister={register}
          />          
        </div>
        <div className={`signUp-container ${register ? "active" : "inactive"}-dx`}>
          <SignUp
            formSubmit={submitCreateAccount}
            toggleForm={toggleForm}
            closeWidget={hidePopup}
            isRegister={register}
          />
        </div>
      </div>
      
      <ToastContainer draggable />
    </MainModals>
  );
};

export default AuthenticationModal;
