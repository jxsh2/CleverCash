import {calendar, dashboard, expAnalysis, expenses, incomes, transactions, } from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Incomes",
        icon: incomes,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
	{
        id: 4,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },

    {
        id: 5,
        title: "Dues",
        icon: calendar,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Expense Analysis",
        icon: expAnalysis,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Income Analysis",
        icon: expAnalysis,
        link: "/dashboard",
    },


]