import React from 'react';
import styled from 'styled-components'
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Incomes from './Components/Incomes/Incomes';
import Expenses from './Components/Expenses/Expenses';
import Dues from './Components/Dues/Dues';
import { useGlobalContext } from './context/globalContext';
import ViewTransactions from './Components/ViewTransactions/ViewTransactions';
import ExpenseAnalysis from './Components/ExpenseAnalysis/ExpenseAnalysis';
import IncomeAnalysis from './Components/IncomeAnalysis/IncomeAnalysis';


function App() {
  // activate dashboard on left
  const [active, setActive] = React.useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return<Dashboard />
      case 2:
        return <Incomes />
      case 3:
        return <Expenses />
      case 4:
        return <ViewTransactions />
      case 5:
        return<Dues />
      case 6:
        return <ExpenseAnalysis/>
      case 7:
          return <IncomeAnalysis/>
      default:
        return <Dashboard />
    }
  }

  //main layout
  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
    </MainLayout>
      </AppStyled>
  );
}

// styling
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${bg});
  backdrop-filter: blur(4.5px);
  position: relative;
  main{
    flex: 1;
    background: #F2F2F2;
    border: 2px solid #236DF6;
    backdrop-filter: blur(4.5px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App
