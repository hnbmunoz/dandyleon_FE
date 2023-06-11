import {create} from "zustand";

interface TransactionModel {  
  id: number | null;
  transact_id: number;
  display_name: string;
  name: string;
  products: string;  
  delivered : string;
  price: number; 
  created_at: string;
}

interface TransactionState {
  transactionList: TransactionModel[];
  updateTransaction: (queriedList: TransactionState['transactionList']) => void
}
export const useTransactionStore = create<TransactionState>((set) => ({
  transactionList:  [],
  updateTransaction: (list: any) => set({transactionList: list}),
}))

