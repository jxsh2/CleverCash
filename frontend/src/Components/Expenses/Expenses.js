import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { peso } from '../../utils/Icons';
import { Select, Input } from 'antd';

const { Option } = Select;

function Expenses() {
    const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()
    const [sortBy, setSortBy] = useState('date'); // Default sort by date
    const [sortOrder, setSortOrder] = useState('desc'); // Default sort order is descending
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    useEffect(() =>{
        getExpenses()
    }, [])

    // Sort and filter expenses based on selected sort by, sort order, and search query
    const sortedAndFilteredExpenses = expenses
        .filter(expense => expense.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'amount') {
                return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            } else if (sortBy === 'category') {
                return sortOrder === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
            } else {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
        });

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <div className="sort-filters">
                    <Select defaultValue="date" onChange={(value) => setSortBy(value)}>
                        <Option value="date">Sort by Date</Option>
                        <Option value="amount">Sort by Amount</Option>
                        <Option value="category">Sort by Category</Option>
                    </Select>
                    <Select defaultValue="desc" onChange={(value) => setSortOrder(value)}>
                        <Option value="asc">Ascending</Option>
                        <Option value="desc">Descending</Option>
                    </Select>
                    <Input
                        placeholder="Search Expenses"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
                <h2 className="total-income">Total Expenses: <span>{peso} {totalExpenses().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {sortedAndFilteredExpenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <IncomeItem
                                key={_id} 
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="red"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

//css
const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    h1{
        color: #236DF6
    }
    h2{
        color: #FFFFFF
        
    }
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #236DF6;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: red;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
    .sort-filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
`;

export default Expenses