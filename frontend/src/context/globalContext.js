import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()
// send something to the database
export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [ due, setDues] = useState([])
    const [error, setError] = useState(null)

    // post income
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) => {
            setError(err.response.data.message)
        })

        getIncomes()
    }
    // get income
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }   
    // delete income
const deleteIncome = async (id) => {
    const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
    getIncomes()
}
    // compute total income
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount
        })
        return totalIncome;
    }
    console.log(totalIncome());

        // post expense
        const addExpense= async (income) => {
            const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
    
            getExpenses()
        }
        // get expenses
        const getExpenses = async () => {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
            console.log(response.data)
        }   
        // delete expense
    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
        // compute total expenses
        const totalExpenses = () => {
            let totalExpenses = 0;
            expenses.forEach((expense) => {
                totalExpenses += expense.amount 
            })
            return totalExpenses;
        }
        
        // total balance
        const totalBalance = () => {
            return totalIncome() - totalExpenses()
        }

        // transaction history
        const transactionHistory = () => {
            const history = [...incomes, ...expenses]
            history.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })

            return history.slice(0, 4)
        }

        //all history for transactions
        const transactionHistoryAll = () => {
            const history = [...incomes, ...expenses]
            history.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })

            return history
        }

        // post dues
        const addDue= async (income) => {
            const response = await axios.post(`${BASE_URL}add-due`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
    
            getDues()
        }
        // get dues
        const getDues = async () => {
            const response = await axios.get(`${BASE_URL}get-dues`)
            setDues(response.data)
            console.log(response.data)
        }   
        // delete dues
    const deleteDue = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-due/${id}`)
        getDues()
    }
    // upcoming dues
    const dueHistory = (inputDate) => {
        const history = [...due];
        history.sort((a, b) => {
            const diffA = Math.abs(new Date(a.createdAt) - new Date(inputDate));
            const diffB = Math.abs(new Date(b.createdAt) - new Date(inputDate));
            return diffA - diffB;
        });
        return history.slice(0, 4)
    };
    
    
    return(
        <GlobalContext.Provider value = {{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            transactionHistoryAll,
            due,
            addDue,
            getDues,
            deleteDue,
            dueHistory,
            
            
            
    
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}