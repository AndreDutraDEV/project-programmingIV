'use client';

import ProtectedPage from '@/shared/components/ProtectedPage';
import { useListTransactions } from '@/modules/transactions/application/useListTransactions';

export default function TransactionsPage() {
    const { transactions, loading } = useListTransactions();

    if (loading) return <p>Carregando...</p>;

    if (transactions.length === 0) {
        return (
            <ProtectedPage>
                <p>Nenhuma transação encontrada.</p>
            </ProtectedPage>
        );
    }

    return (
        <ProtectedPage>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Minhas Transações</h1>
                <ul className="space-y-2">
                    {transactions.map((t) => (
                        <li key={t.id} className="p-4 border rounded shadow">
                            <p><strong>Descrição:</strong> {t.description}</p>
                            <p><strong>Tipo:</strong> {t.type}</p>
                            <p><strong>Valor:</strong> R$ {t.amount.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </ProtectedPage>
    );
}