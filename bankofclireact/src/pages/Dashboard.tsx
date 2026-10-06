import React from "react";
import CurrentBalance from "../components/CurrentBalance";
import BalanceHistory from "../components/BalanceHistory";
import TransactionHistory from "../components/TransactionHistory";
import "./Dashboard.css"

class Dashboard extends React.Component {
    render() {
        const user = "user";

        return (
            <>
                <div className="dashboardContainer">  
                    <div>
                        <h1>Welcome back, {user}.</h1>
                        <p>Stay on top of your account activity and transactions.</p>
                    </div>
                    <div className="BalanceInfo">
                        <CurrentBalance/>
                        <BalanceHistory/>
                    </div>
                    <TransactionHistory/>
                </div>
            </>
            
        )
    }
}

export default Dashboard
