
export class Transaction {
    transaction_id: Number;
    amount: BigInt;
    transfer_type: String;
    source_account: Number;
    destination_account: Number;

    constructor(transaction_id: Number, amount: BigInt, transfer_type: String, source_account: Number, destination_account: Number) {
        this.transaction_id = transaction_id;
        this.amount = amount;
        this.transfer_type = transfer_type;
        this.source_account = source_account;
        this.destination_account = destination_account;
    }

    static fetchTransactions():Array<Transaction> {
        let transaction:Transaction = {transaction_id: 1, amount: BigInt(10), transfer_type: "Withdraw", source_account: 1, destination_account: 2}
        let transactions:Array<Transaction> = [transaction]
        return transactions;
    }
}