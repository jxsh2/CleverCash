import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { add } from "../../utils/Icons";


function Form() {

    const {addIncome, error, setError} = useGlobalContext()
    const [inputState, setInputState] =  useState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
    })
    
    const {title, amount, date, category, description } = inputState;

    const handleInput = name => e =>{
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        // to prevent refresh
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title:'',
            amount:'',
            date:'',
            category:'',
            description:'',
        })
    }
    //html
    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input 
                type="text"
                value={title}
                name={'title'}
                placeholder="Income Title"
                onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                type="text"
                value={amount}
                name={'amount'}
                placeholder="Income Amount"
                onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Date'
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date)=> {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Income'}
                    icon={add}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#236DF6'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}
// css
const FormStyled = styled.form`
display: flex;
flex-direction: column;
gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .8rem 1rem;
        border-radius: 5px;
        background:  #FFFFFF;
        resize: none;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        color: #747474;
        &::placeholder{
            color: #747474;
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: #747474;
            &:focus, &:active{
                color: #236DF6;
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            &:hover{
                background: #2CD733 !important;
            }
        }
    }
`;
export default Form