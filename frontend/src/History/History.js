import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();

    const history = transactionHistory();

    return (
        <HistoryStyled>
            <div className='history-con'>
                <h2>Recent Transactions</h2>
                {history.length === 0 ? (
                    <p>No recent transactions</p>
                ) : (
                    history.map((item) => {
                        const { _id, title, amount, type } = item;
                        return (
                            <div key={_id} className="history-item">
                                <p style={{
                                    color: type === 'expense' ? '#C54A4A' : '#45BB90'
                                }}>
                                    {title}
                                </p>

                                <p style={{
                                    color: type === 'expense' ? '#C54A4A' : '#45BB90'
                                }}>
                                    {type === 'expense' ? `- ₱ ${(isFinite(amount) ? Math.max(0, amount) : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `+ ₱ ${(isFinite(amount) ? Math.max(0, amount) : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    .history-con {
        height: 400px;
        background: #FFFFFF;
        border-radius: 20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        margin-top: 1rem;
        max-width: 100%; 
    }

    h2 {
        text-align: center;
        color: #236DF6;
    }
    p {
        font-size: 1rem;
        text-align: center;
    }

    .history-item {
        background: #F2F2F2;
        border: 2px solid #236DF6;
        padding: 0.5rem;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 100%; 
        margin-bottom: 1rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .history-item:not(:last-child) {
        margin-bottom: 10px; /* Add desired gap between items */
    }
`;

export default History
