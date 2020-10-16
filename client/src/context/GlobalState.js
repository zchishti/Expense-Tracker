import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
};


//Creating Context
export const GlobalContext = createContext(initialState);

//Provider to supply context
export const GlobalProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const API_HOME = '/api/v1/transactions'; 

    async function getTransactions(){
        try{
            const res = await axios.get(API_HOME);
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });

        }catch(err){
            dispatch({
                type: 'ERROR_TRANSACTIONS',
                payload: err.response.data.error
            });
        }
    } 

    //Actions
    async function deleteTransaction(id){
        try{
            await axios.delete(`${API_HOME}/${id}`)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        }catch(err){
            dispatch({
                type: 'ERROR_TRANSACTIONS',
                payload: err.response.data.error
            });
        }
    }

    async function addTransaction(transaction){
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        try{
            const res = await axios.post(API_HOME,transaction,config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        }catch(err){
            dispatch({
                type: 'ERROR_TRANSACTIONS',
                payload: err.response.data.error
            });
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}