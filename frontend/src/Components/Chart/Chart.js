import React from 'react'
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {

    const { incomes, expenses } = useGlobalContext()

    // Function to sort by month
    const sortByMonth = (data) => {
        return data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Sort incomes and expenses by month
    const sortedIncomes = sortByMonth(incomes);
    const sortedExpenses = sortByMonth(expenses);

    const data = {
        labels: sortedIncomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: sortedIncomes.map((income) => income.amount),
                backgroundColor: '#45BB90',
                borderColor: '#45BB90',
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: sortedExpenses.map((expense) => expense.amount),
                backgroundColor: '#C54A4A',
                borderColor: '#C54A4A', 
                tension: 0.2
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} options={{ maintainAspectRatio: false }} />
        </ChartStyled>
    )
}

//css
const ChartStyled = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
