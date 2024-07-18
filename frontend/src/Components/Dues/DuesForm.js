import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { add } from "../../utils/Icons";


function DueForm() {

    const {addDue, error, setError} = useGlobalContext()
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
        addDue(inputState)
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
        <DueFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input 
                type="text"
                value={title}
                name={'title'}
                placeholder="Due Title"
                onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                type="text"
                value={amount}
                name={'amount'}
                placeholder="Due Amount"
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
                    <option value="car">Car Insurance</option>
                    <option value="home">Home Insurance</option>
                    <option value="gym">Gym Membership</option>
                    <option value="credit">Credit Card</option>
                    <option value="health">Health Insurance</option>
                    <option value="life">Life Insurance</option>  
                    <option value="util">Utilities</option> 
                    <option value="sub">Software Subscriptions</option>   
                    <option value="other">Other</option> 
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Due'} 
                    icon={add}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#236DF6'}
                    color={'#fff'}
                />
            </div>
        </DueFormStyled>
    )
}
// css
const DueFormStyled = styled.form`
display: flex;
flex-direction: column;
gap: 2rem;
margin-top: 2rem;
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
export default DueForm