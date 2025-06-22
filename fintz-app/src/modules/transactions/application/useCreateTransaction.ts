// src/modules/transactions/application/useCreateTransaction.ts
import { createTransaction } from '../infrastructure/transactionApi';
import { TransactionType } from '../domain/Transaction';

export function useCreateTransaction() {
  const submit = async (data: {
    accountId: number;
    categoryId: number;
    amount: number;
    type: TransactionType;
    description: string;
  }) => {
    await createTransaction(data);
  };

  return { submit };
}