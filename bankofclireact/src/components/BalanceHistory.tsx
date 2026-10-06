import React from "react";
import "./BalanceHistory.css"

class BalanceHistory extends React.Component {
    render() {
        const graph = "Place Graph Here"

        return (
            <div className="balanceHistory componentCard">
                <h2>Balance History</h2>
                <p>{graph}</p>
            </div>
        )
    }
}

export default BalanceHistory
