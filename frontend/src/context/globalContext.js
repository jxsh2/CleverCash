import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [due, setDues] = useState([]);
  const [error, setError] = useState(null);

  // post income
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // get income
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // delete income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // compute total income
  const totalIncome = () =>
    incomes.reduce((acc, income) => acc + income.amount, 0);

  // post expense
  const addExpense = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, income);
      getExpenses();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // get expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // compute total expenses
  const totalExpenses = () =>
    expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // total balance
  const totalBalance = () => totalIncome() - totalExpenses();

  // transaction history
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 4);
  };

  // all history
  const transactionHistoryAll = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history;
  };

  // post due
  const addDue = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-due`, income);
      getDues();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // get dues
  const getDues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-dues`);
      setDues(response.data);
      console.log(response.data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // delete due
  const deleteDue = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-due/${id}`);
      getDues();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  // upcoming dues
  const dueHistory = (inputDate) => {
    const history = [...due];
    history.sort((a, b) => {
      const diffA = Math.abs(new Date(a.createdAt) - new Date(inputDate));
      const diffB = Math.abs(new Date(b.createdAt) - new Date(inputDate));
      return diffA - diffB;
    });
    return history.slice(0, 4);
  };

  // generic error handler
  const handleAxiosError = (err) => {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("An unexpected error occurred.");
      console.error("Axios error:", err);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
