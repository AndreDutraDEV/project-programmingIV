// src/modules/transactions/domain/Transaction.ts

export type TransactionType = 'income' | 'expense' | 'transfer';

export class Transaction {
  constructor(
    public id: number,
    public accountId: number,
    public categoryId: number,
    public amount: number,
    public type: TransactionType,
    public description: string,
    public date: Date
  ) {}

  static fromJson(json: any): Transaction {
    return new Transaction(
      json.id,
      json.account_id,
      json.category_id,
      parseFloat(json.amount),
      json.type,
      json.description,
      new Date(json.date)
    );
  }
}