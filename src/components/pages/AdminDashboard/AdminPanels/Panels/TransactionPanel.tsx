import React, { useState, useEffect, MouseEvent} from 'react'
import { useTransactionStore } from '../../../../store/useTransactionStore/useTransactionStore'
import { useFilterStore } from '../../../../store/filterStore/useFilterStore';
import { usePopUpInterface } from '../../../../store/popupStore/usePopUpInterface';
import { useBlurStore } from '../../../../store/blurStore/useBlurStore';
import { usePopUpStore } from '../../../../store/popupStore/usePopUpStore';
import { useLoaderStore } from '../../../../store/loaderStore/useLoaderStore';
import { userProfileStore } from '../../../../store/profileStore/useProfileStore';
import { toast } from "react-toastify";
import axios from 'axios';

const TransactionPanel = () => {
  const { transactionList, updateTransaction } = useTransactionStore();
  const { setFilter } = useFilterStore();
  const { overwriteInterface } = usePopUpInterface();
  const { showLoading, hideLoading} = useLoaderStore();
  const { showBlur } = useBlurStore();
  const { showPopUp } = usePopUpStore();
  const { profile } = userProfileStore();
  
  useEffect(() => {
    
    transactionList
  
    return () => {
      
    }
  }, [])

  const openTransactionPop = async (e : MouseEvent<HTMLButtonElement>) => {    
    await overwriteInterface(<TransactionList   id={Number(e.currentTarget.dataset.transaction_id)}/>);
    // id={Number(e.currentTarget.dataset.transaction_id)}
    await showBlur();
    await showPopUp();
  }

  const setToDone = async(e : any) => {
    let id = e.currentTarget.dataset.transaction_id
    await showLoading();
    await axios({
      method: "patch",
      url: `/api/v2/transactions/delivered/${id}`,
      headers: {
        token: profile.token,
       
      },
      data: { },
    })
      .then((res: any) => {
        // toast.success(res.headers.msg ? res.headers.msg : "");
        LoadAllTransactions()
        hideLoading();
        
      })
      .catch((ex: any) => {
        toast.error("Save Failed");
        hideLoading();
      });
  }


  
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
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
      });

    await hideLoading()
  }
  
  return (
    <div className="config-panel">
      <div className="config-header"> Transactions </div>
      <div className="config-body">
        <div className="config-table">
          <div className="table-header">
            <div className="header-elements col-width1">Client</div>
            <div className="header-elements col-width2">Date</div>
            <div className="header-elements col-width3">Status</div>
          </div>
          <div className="table-body">
          {transactionList
              .filter((allRecord) =>
                allRecord.display_name
                  .toLowerCase()
                  .includes(`${setFilter.toLowerCase().trim()}`)
              )
              .map((el) => {
                return (
                  <div className="table-row" >
                    <div className="table-elements col-width1">{el.display_name}</div>
                    <div className="table-elements col-width2">
                      {new Date(el.created_at).toDateString() }
                    </div>                
                    <div className="table-elements col-width2">               
                      {el.delivered === "pending" ? 
                       <button className="table-btn-details" data-transaction_id={el.transact_id} onClick={setToDone}>
                        Set as Delivered
                      </button> 
                      : "Delivered"}
                    </div>
                    <div className="table-elements col-width3" >                     
                      <button className="table-btn-details" data-transaction_id={el.id} onClick={openTransactionPop}>
                         View
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionPanel

interface viewTransactionProp {
  id : number
}
const TransactionList = ({id} : viewTransactionProp) => {
  const { transactionList } = useTransactionStore();
  const [list, setList] = useState<any[]>([])
  let dollarUSLocale = Intl.NumberFormat("en-US");
  useEffect(() => {
    let targetList : any = transactionList.find(record => record.id = 1)
    
    setList(JSON.parse(targetList.products))
    return () => {
      
    }
  }, [])


  
  return (
    <div className='cart-body flex-column' style={{justifyContent: 'flex-start'}}>
      <div className='flex-row' style={{padding: "1rem"}}>
        <div style={{padding: "0 1rem"}}>Product Name</div>
        <div style={{padding: "0 1rem"}}>Quantity</div>
        <div style={{padding: "0 1rem"}}>Price</div>
      </div>
      {list.map((item, idx) => {
          return (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                  {item.product_name}
                </div>
                <div>
                  {item.qty}
                </div>
                <div>                
                  {dollarUSLocale.format(item.price)}
                </div>
               
              </div>
            </div>
          )
        })}
    </div>
  )
}

