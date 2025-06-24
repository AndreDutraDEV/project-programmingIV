import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading: boolean;
  errorMessage: string | null; // Mudei para aceitar string ou null
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, errorMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'login') {
      onSubmit({ email, password });
    } else {
      onSubmit({ name, email, cell, password });
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Login' : 'Criar Conta'}
      </h2>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <Input
            label="Nome"
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {type === 'register' && (
          <Input
            label="Celular"
            id="cell"
            type="tel"
            placeholder="Seu celular"
            value={cell}
            onChange={(e) => setCell(e.target.value)}
            required
          />
        )}
        <Input
          label="Senha"
          id="password"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
        <div className="flex items-center justify-between">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando...' : (type === 'login' ? 'Entrar' : 'Registrar')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;