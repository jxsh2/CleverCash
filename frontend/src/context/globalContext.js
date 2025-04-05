import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [due, setDues] = useState([]);
  const [error, setError] = useState(null);

  // income
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      handleError(err);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      handleError(err);
    }
  };

  const totalIncome = () => incomes.reduce((acc, curr) => acc + curr.amount, 0);

  // expense
  const addExpense = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, income);
      getExpenses();
    } catch (err) {
      handleError(err);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      handleError(err);
    }
  };

  const totalExpenses = () =>
    expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    return history
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  };

  const transactionHistoryAll = () => {
    const history = [...incomes, ...expenses];
    return history.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // due
  const addDue = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-due`, income);
      getDues();
    } catch (err) {
      handleError(err);
    }
  };

  const getDues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-dues`);
      setDues(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  const deleteDue = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-due/${id}`);
      getDues();
    } catch (err) {
      handleError(err);
    }
  };

  const dueHistory = (inputDate) => {
    const history = [...due];
    return history
      .sort((a, b) => {
        const diffA = Math.abs(new Date(a.createdAt) - new Date(inputDate));
        const diffB = Math.abs(new Date(b.createdAt) - new Date(inputDate));
        return diffA - diffB;
      })
      .slice(0, 4);
  };

  // centralized error handling
  const handleError = (err) => {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
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
