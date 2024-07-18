import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../utils/dateFormat';

function DueHistory() {
    const { dueHistory } = useGlobalContext();
    let history = dueHistory();

    // Filter out past due items
    const pendingDues = history.filter(item => new Date(item.date) >= new Date());

    // Sort pending dues by due date in ascending order
    pendingDues.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get the closest four due items
    const closestDues = pendingDues.slice(0, 4);

    return (
        <DueHistoryStyled>
            <div className='history-con'>
                <h2>Upcoming Dues</h2>
                {closestDues.length > 0 ? (
                    closestDues.map((item) => (
                        <div key={item.id} className="history-item">
                            <div className="due-info">
                                <h3>{item.title}</h3>
                                <div className="due-amount">
                                    <p>Due On: <span>{dateFormat(item.date)}</span></p>
                                    <p>Amount: ₱ <span>{item.amount.toLocaleString()}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='no-pen'>No pending dues</p>
                )}
            </div>
        </DueHistoryStyled>
    );
}
const DueHistoryStyled = styled.div`
    .history-con {
        height: 400px;
        background: #FFFFFF;
        border-radius: 20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
        padding: 1rem;
        max-width: 100%; 
        overflow-x: auto; 
    }
    h3{
        font-size: 1rem;
        color: #000000;
        padding: .4rem;
    }

    h2 {
        text-align: center;
        color: #236DF6;
    }
    .no-pen{
        font-size: 1.5rem;
    }
    
    }
    p {
        font-size: .9rem;
        font-weight: 600;
        text-align: center;
        color: #747474;
        margin: 0; 
    }

    .history-item {
        background: #F2F2F2;
        border: 2px solid #236DF6;
        padding: 0.1rem;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start; 
        max-width: 100%; 
        margin-bottom: 1rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .history-item:not(:last-child) {
        margin-bottom: 10px; 
    }

    .due-info {
        width: 100%;
    }

    .due-amount {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .due-amount p {
        flex-basis: 50%;
    }

    @media (max-width: 768px) {
        .history-con {
            width: 95%;
        }
    }
`;

export default DueHistory
