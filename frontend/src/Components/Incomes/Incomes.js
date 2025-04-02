import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { peso } from "../../utils/Icons";
import { Select, Input } from "antd";

const { Option } = Select;

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
  const [sortBy, setSortBy] = useState("date"); // Default sort by date
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order is descending
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    getIncomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sort and filter incomes based on selected sort by, sort order, and search query
  const sortedAndFilteredIncomes = incomes
    .filter((income) =>
      income.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortBy === "category") {
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else if (sortBy === "currentDate") {
        const currentDate = new Date();
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const diffA = Math.abs(dateA - currentDate);
        const diffB = Math.abs(dateB - currentDate);
        return sortOrder === "asc" ? diffA - diffB : diffB - diffA;
      } else {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
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
            placeholder="Search Incomes"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
        <h2 className="total-income">
          Total Income:{" "}
          <span>
            {peso}{" "}
            {totalIncome().toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {sortedAndFilteredIncomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
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
                  indicatorColor="#2CD733"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}
//css
const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  h1 {
    color: #236df6;
  }
  h2 {
    color: #ffffff;
  }
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #236df6;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    h2 {
      color: #63ff69;
    }
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: #63ff69;
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
  .sort-filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export default Income;
