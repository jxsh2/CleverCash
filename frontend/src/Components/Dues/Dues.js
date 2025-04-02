import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import DuesItem from "../IncomeItem/DuesItem";
import DuesForm from "./DuesForm";

function Dues() {
  const { due, getDues, deleteDue } = useGlobalContext();

  useEffect(() => {
    getDues();
  }, [getDues]);

  // Sort dues by closest due date
  const sortedDues = [...due].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Group dues into past due and pending categories
  const pastDueDues = sortedDues.filter(
    (due) => new Date(due.date) < new Date()
  );
  const pendingDues = sortedDues.filter(
    (due) => new Date(due.date) >= new Date()
  );

  // Function to show desktop notification
  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  // Request permission to show notifications
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Check and show notifications for past due dues and dues due tomorrow
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    pastDueDues.forEach((due) => {
      if (new Date(due.date) <= today) {
        showNotification("Past Due", `${due.title} is past due!`);
      } else if (new Date(due.date) <= tomorrow) {
        showNotification("Due Tomorrow", `${due.title} is due tomorrow!`);
      }
    });
  }, [pastDueDues]);

  return (
    <DuesStyled>
      <InnerLayout>
        <h1>Dues</h1>
        <div className="income-content">
          <div className="form-container">
            <DuesForm />
          </div>
          <div className="incomes">
            {pastDueDues.length > 0 && (
              <>
                <h2 className="past">Past Due</h2>
                {pastDueDues.map((income) => {
                  const {
                    _id,
                    title,
                    amount,
                    date,
                    category,
                    description,
                    type,
                  } = income;
                  return (
                    <DuesItem
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      amount={amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      date={date}
                      type={type}
                      category={category}
                      indicatorColor="red"
                      deleteItem={deleteDue}
                    />
                  );
                })}
              </>
            )}
            {pendingDues.length > 0 && (
              <>
                <h2 className="pending">Pending</h2>
                {pendingDues.map((income) => {
                  const {
                    _id,
                    title,
                    amount,
                    date,
                    category,
                    description,
                    type,
                  } = income;
                  return (
                    <DuesItem
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      amount={amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      date={date}
                      type={type}
                      category={category}
                      indicatorColor="orange"
                      deleteItem={deleteDue}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </InnerLayout>
    </DuesStyled>
  );
}

const DuesStyled = styled.div`
  display: flex;
  overflow: auto;
  h1 {
    color: #236df6;
  }
  .past {
    margin-top: 2rem;
    color: red;
  }
  .pending {
    margin-top: 2rem;
    color: orange;
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
  .h2 .past {
    color: red;
  }
`;

export default Dues;
