import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { Select } from 'antd';

const { Option } = Select;

function ViewTransactions() {
    const { transactionHistoryAll } = useGlobalContext();
    const [...history] = transactionHistoryAll();
    const [sortBy, setSortBy] = useState('date'); // Default sort by date

    // Sort history based on selected sort by
    const sortedHistory = history.sort((a, b) => {
        if (sortBy === 'income') {
            return a.type === 'income' ? 1 : -1;
        } else if (sortBy === 'expense') {
            return a.type === 'expense' ? 1 : -1;
        } else if (sortBy === 'date') {
            // Sort by the newest date
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return a.type === 'expense' ? b.amount - a.amount : a.amount - b.amount;
        }
    });

    return (
        <ViewTransactionsStyled>
            <h2>Recent Transactions</h2>
            <div className="sort-by">
                <label>Sort by: </label>
                <Select value={sortBy} onChange={(value) => setSortBy(value)} className="custom-select">
                    <Option value="date">Recent</Option>
                    <Option value="income">Expense</Option>
                    <Option value="expense">Income</Option>
                </Select>
            </div>
            {sortedHistory.length === 0 ? (
                <p>No recent transactions</p>
            ) : (
                <div className="transaction-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedHistory.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td style={{ color: item.type === 'expense' ? '#C54A4A' : '#45BB90' }}>
                                        {item.type === 'expense' ? `- ₱${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `+ ₱${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </ViewTransactionsStyled>
    );
}

const ViewTransactionsStyled = styled.div`
    padding: 1rem;

    h2 {
        font-size: 4rem;
        text-align: center;
        color: #236DF6;
        margin-bottom: 1rem;
    }

    .sort-by {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        label {
            margin-right: 1rem;
            font-weight: bold;
            color: #666;
            text-align: left; 
        }
        .custom-select {
            width: 200px;
            border-radius: 5px;
        }
    }

    .transaction-table {
        overflow-x: auto;
        margin-top: 2rem;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        text-align: center; 
        table {
            width: 100%;
            border-collapse: collapse;
            th, td {
                padding: 1rem;
                border: none;
            }
            th {
                background-color: #f2f2f2;
                font-weight: 700;
                color: blue;
                text-align: center;
            }
            td {
                font-weight: 700;
                color: black;
            }
            tbody tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            tbody tr:hover {
                background-color: #ADD8E6;
        }
    }
`;

export default ViewTransactions;
