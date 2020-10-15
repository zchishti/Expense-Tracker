import React, { useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {

    const { addTransaction } = useContext(GlobalContext);

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: Math.floor(Math.random() * 1000),
            text,
            amount: +amount
        }

        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new Taransaction</h3>
            <form id="form" onSubmit={onSubmit}>
                <div className="form-controls">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text" placeholder="Enter text..." />
                </div>
                <div className="form-controls">
                    <label htmlFor="amount">Amount<br/>(negative - expnese, positive - income)</label>
                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add Transaction</button>
            </form>
        </>
    )
}

export default AddTransaction;