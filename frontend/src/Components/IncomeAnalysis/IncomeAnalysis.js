import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { Pie } from "react-chartjs-2";

function IncomeAnalysis() {
    const { transactionHistoryAll } = useGlobalContext();
    const [incomeData, setIncomeData] = useState(null);
    const [categoryTotals, setCategoryTotals] = useState({});
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
    const [lastMonthTotal, setLastMonthTotal] = useState(0);
    const [percentageDifference, setPercentageDifference] = useState(0);
    const [currentMonthName, setCurrentMonthName] = useState("");
    const [comparisonTitle, setComparisonTitle] = useState("");

    useEffect(() => {
        const history = transactionHistoryAll();
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

        setCurrentMonthName(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate));

        const currentMonthIncome = history.filter(
            item => new Date(item.date).getMonth() === currentMonth && item.type === 'income'
        );

        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

        const lastMonthIncome = history.filter(
            item => new Date(item.date).getMonth() === lastMonth && item.type === 'income'
        );

        const incomeAmountsByCategory = {};

        currentMonthIncome.forEach(item => {
            const { category, amount } = item;
            if (incomeAmountsByCategory[category]) {
                incomeAmountsByCategory[category] += amount;
            } else {
                incomeAmountsByCategory[category] = amount;
            }
        });

        setCategoryTotals(incomeAmountsByCategory);

        const currentMonthTotal = currentMonthIncome.reduce((acc, curr) => acc + curr.amount, 0);
        setCurrentMonthTotal(currentMonthTotal);

        const lastMonthTotal = lastMonthIncome.reduce((acc, curr) => acc + curr.amount, 0);
        setLastMonthTotal(lastMonthTotal);

        const percentageDifference = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
        setPercentageDifference(percentageDifference);

        setIncomeData({
            labels: Object.keys(incomeAmountsByCategory),
            datasets: [
                {
                    data: Object.values(incomeAmountsByCategory),
                    backgroundColor: [
                        '#36A2EB',
                        '#FFCE56',
                        '#8A2BE2',
                        '#FF7F50',
                        '#20B2AA',
                        '#FFD700'
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FFCE56',
                        '#8A2BE2',
                        '#FF7F50',
                        '#20B2AA',
                        '#FFD700'
                    ]
                }
            ]
        });

        setComparisonTitle(`Comparison vs. Last Month`);
    }, [transactionHistoryAll]);

    return (
        <IncomeAnalysisStyled>
            <h2>Income Analysis</h2>
            <h1 className="total">Total Income: ₱ {currentMonthTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</h1>
            <div className="content">
                {incomeData ? (
                    <div className="chart-container">
                        <Pie
                            data={incomeData}
                            options={{
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            var dataset = data.datasets[tooltipItem.datasetIndex];
                                            var total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                                            var currentValue = dataset.data[tooltipItem.index];
                                            var percentage = Math.round((currentValue / total) * 100);
                                            return `${data.labels[tooltipItem.index]}: ₱${currentValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })} (${percentage}%)`;
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="summary">
                    <h3>Summary for Month {currentMonthName}</h3>
                    <div className="summary-scroll">
                        {Object.keys(categoryTotals).map(category => (
                            <p key={category}>Total {category}: ₱ {categoryTotals[category].toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                        ))}
                        
                    </div>
                </div>
                <div className="comparison">
                    <h3>{comparisonTitle}</h3>
                    <p>Last Month Total: ₱ {lastMonthTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                    <p>Current Month Total: ₱ {currentMonthTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                    <p>Percentage Difference: {percentageDifference.toFixed(2)}%</p>
                </div>
            </div>
        </IncomeAnalysisStyled>
    );
}

const IncomeAnalysisStyled = styled.div`
    height: 100%;
    overflow: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    

    h2 {
        font-size: 3rem;
        text-align: center;
        color: #236DF6;
        margin-bottom: 1rem;
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: space-around;
        padding: 2rem;
        overflow: hidden;
        
    }
    

    .total{
        font-size: 2rem;
        color: green;
        text-align: center;
    }

    .chart-container {
        width: 50%;
        margin-bottom: 6rem;
        auto-resize: false;
    }

    .summary {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 60px;
        margin-bottom: 3rem; 
        height: 70%;
        margin-right: 2rem;
        margin-left: 2rem;
        width: 50%;
        text-align: left;
        background: #F2F2F2;
        border: 2px solid #236DF6;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .comparison {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 60px;
        margin-bottom: 6rem;
        height: 70%;
        width: 50%;
        text-align: left;
        background: #F2F2F2;
        border: 2px solid #236DF6;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    

    .summary-scroll {
        max-height: 300px;
        overflow-y: auto;
    }

    p {
        font-size: 1.3rem;
        text-align: left;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1rem;
        color: #333;
    }
`;

export default IncomeAnalysis;
