import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "../Chart/Chart";
import { peso } from "../../utils/Icons";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import DueHistory from "../../History/DuesHistory";

function Dashboard() {
  const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } =
    useGlobalContext();

  //render the data
  useEffect(() => {
    getIncomes();
    getExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {peso}{" "}
                  {totalBalance().toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {peso}{" "}
                  {totalIncome().toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expenses</h2>
                <p>
                  {peso}{" "}
                  {totalExpenses().toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="dueHistory-con">
            <DueHistory />
            <div className="history-con">
              <History />
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`

.stats-con {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 2rem;

    .chart-con {
        grid-column: span 2;
        height: 400px;

        .balance h2,
        .income h2,
        .expense h2 {
            color: #FFFFFF;
            font-weight: 500;
            text-align: center;
        }
        .amount-con {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 2rem;

            .income {
                height: 130px;
                grid-column: span 2;
                background: #45BB90;
            }

            .expense {
                height: 130px;
                grid-column: span 2;
                background: #C54A4A;
            }

            .balance {
                grid-column: 1 / 5; 
                height: 180px;
                background: #236df6;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p {
                    color: #FFFFFF;
                    font-size: 3vw; 
                    font-weight: 900;
                    text-align: center; 
                }
            }
            
            .income p, .expense p {
                color: #FFFFFF;
                font-size: 2rem;
                font-weight: 700;
                text-align: center;
            }
        }
    }

    .income, .expense, .balance {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        padding: 1rem;
    }
    
    @media screen and (max-width: 768px) {
        .stats-con {
        grid-template-columns: 1fr; 
        }
    }
    
    @media screen and (min-width: 1920px) {
        .stats-con {
        grid-template-columns: repeat(5, 1fr);
    .dueHistory {
        display: block;
    }
    
    .history-con {
        display: block;
    }
        

`;
export default Dashboard;
