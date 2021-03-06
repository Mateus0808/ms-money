import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionResponse {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string
}

type TransactionRequest = Omit<TransactionResponse, 'id' | 'createdAt'>
// type TransactionRequest = Pick<TransactionResponse, 'title' | 'amount' | 'category' | 'type'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextProps {
  transactions: TransactionResponse[],
  createTransaction: (transaction: TransactionRequest) => Promise<void>
}

const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsProvider ({ children }: TransactionsProviderProps) {
  const [transactions, setTransaction] = useState<TransactionResponse[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransaction(response.data.transactions))
  }, []);

  async function createTransaction (transactionRequest: TransactionRequest) {
    const response = await api.post('/transactions', {
      ...transactionRequest,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransaction([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}


export function useTransactions () {
  const context = useContext(TransactionsContext)

  return context
}