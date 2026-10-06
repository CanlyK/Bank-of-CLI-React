import React from "react";
import "./CurrentBalance.css"

class CurrentBalance extends React.Component {
    render() {
        const balance = "$25,000"

        return (
            <div className="currentBalance componentCard">
                <h2>Current Balance</h2>
                <p>{balance}</p>
            </div>
        )
    }
}

export default CurrentBalance
