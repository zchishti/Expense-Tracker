import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({transaction}) => {

    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount > 0 ? '+' : '-';
    const signClass = transaction.amount > 0 ? "plus" : "minus";
    return (
        <li className={signClass} > 
            {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
        </li>
    )
}

export default Transaction;