export interface Transaction {
    transaction_id: number;
    amount: number;
    transfer_type: string;
    source_account: number;
    destination_account: number;
}
