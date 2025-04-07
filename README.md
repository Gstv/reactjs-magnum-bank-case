# Magnum Bank - Teste prático

## Objetivo
Desenvolver uma aplicação web de um banco usando ReactJS.

## Requisitos Funcionais

O sistema deve permitir que os usuários realizem operações básicas de gestão financeira, como visualizar o saldo, fazer transações (TED/PIX) e ver o histórico de transações.

## Autenticação de Usuário
- Login e logout de usuários;
- Implementar autenticação de usuário (login e registro) utilizando JWT (JSON Web Tokens).

## Home
- Exibir o saldo atual do usuário;
- Exibir um resumo das últimas transações.

## Realizar transações
- O usuário pode fazer transações financeiras, por exemplo TED/PIX (simulação);
- O usuário precisa digitar a senha de transação para fazer a transferência.

## Conteúdo da tela de transação
- Exibir saldo atual (TED, PIX);
- CPF/CNPJ (TED, PIX);
- Nome do favorecido (TED, PIX);
- Banco (TED);
- Agência (TED);
- Conta (TED);
- Chave (PIX);
- Valor a transferir (TED, PIX);
- Data da transferência (TED, PIX);
- Exibir o resumo da transferência (TED, PIX).

## Comandos e instalação:

Instalar dependências:
```bash
npm install
```

Executar aplicação:
```bash
npm run dev
```