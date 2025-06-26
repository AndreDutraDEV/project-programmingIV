'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, login, logout, updateUser } = useAuth(); // Importar login para re-autenticar se necessário, mas não é o ideal.
    const router = useRouter();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [cell, setCell] = useState(user?.cell || '');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        } else if (user) {
            // Atualiza os estados locais com os dados do usuário carregados
            setName(user.name);
            setEmail(user.email);
            setCell(user.cell);
        }
    }, [isAuthenticated, isLoading, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitLoading(true);
        setError(null);
        setSuccess(null);

        if (!user?.id) {
            setError("ID do usuário não disponível.");
            setSubmitLoading(false);
            return;
        }

        const updateData = { name, email, cell };

        try {

            const response = await fetch(`/api/users?id=${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message || 'Dados atualizados com sucesso!');
                updateUser(data.user); // AQUI: Atualiza o estado global do usuário no hook
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao atualizar perfil.');
            }
        } catch (err: any) {
            setError(err.message || 'Erro de rede ao atualizar perfil.');
        } finally {
            setSubmitLoading(false);
        }
    };

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p>Carregando perfil...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Atualizar Perfil</h2>
                {success && <p className="text-green-600 text-sm italic mb-4 text-center">{success}</p>}
                {error && <p className="text-red-500 text-sm italic mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Celular"
                        id="cell"
                        type="tel"
                        value={cell}
                        onChange={(e) => setCell(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={submitLoading}>
                        {submitLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                    <div className="mt-4 flex justify-between items-center">
                        <Button type="button" onClick={() => router.push('/home')} className="bg-gray-500 hover:bg-gray-700">
                            Voltar para Home
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}