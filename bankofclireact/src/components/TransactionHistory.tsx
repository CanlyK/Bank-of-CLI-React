import React from "react";
import { Transaction } from "../features/Transaction.tsx";
import "./TransactionHistory.css"

class TransactionHistory extends React.Component {
    render() {
        let transactions:Array<Transaction> = Transaction.fetchTransactions();
        return (
            <div className="transactionHistory componentCard">
                <h2>Recent Transactions</h2>
                <ul>
                    {transactions.map((transaction, index) => (
                    <li key={index}>{String(transaction.transaction_id)}</li>
                ))}
                </ul>
            </div>
        )
    }
}

export default TransactionHistory