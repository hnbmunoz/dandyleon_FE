import React, {useState} from 'react'
import MainModals from '../shared/modals/MainModals';
import { ToastContainer, toast } from 'react-toastify';

const Registry = () => {
  const [register, setRegister] = useState(false);

  const notify = () => toast("Registration Complete");

  const handleButton = () => {
    // setRegister(!register);   
  };
  return (
   <MainModals>
      <div className="">
        {/* {register ? <SignUp /> : <SignIn />}        */}
      </div>
      <button className="auth-state" onClick={notify}>
        {register ? "Already have an account? Sign In" :"New User? Sign Up"}
      </button>
      <ToastContainer
        draggable          
      />
    </MainModals>
  );
};

export default Registry