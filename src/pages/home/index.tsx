import { useState, useEffect } from "react";

import { api } from "../../services/api";

import styles from "./style.module.css";

interface Transaction {
  id: number;
  transactionType: string;
  type: string;
  price: number;
  createdAt: Date;
}

interface User {
  id: number;
  name: string;
  balance: number;
}

interface UserRequest {
  transactions: [
    {
      id: number;
      transaction_type: string;
      type: string;
      price: number;
      created_at: Date;
    }
  ];
}

function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User>({
    id: 1,
    name: "Gustavo André",
    balance: 5000,
  });

  useEffect(() => {
    api
      .get<UserRequest>(`users/${user.id}`)
      .then(({ data: { transactions } }) => {
        setTransactions(
          transactions.map((transaction) => ({
            ...transaction,
            transactionType: transaction.transaction_type,
            createdAt: transaction.created_at,
          }))
        );
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, [user]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>MAGNUM BANK</header>

      <section className={styles.balanceCard}>
        <h2>Saldo disponível</h2>
        <p className={styles.balance}>R$ {user.balance}</p>
      </section>

      <section className={styles.actions}>
        <button>Transferir</button>
        <button>Pagar</button>
      </section>

      <section className={styles.transactions}>
        <h3>Últimas transações</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <div className={styles.transactionDetail}>
                <span>{transaction.transactionType}</span>
                <span className={styles.negative}>
                  {transaction.type === "income" ? "+" : "-"}R${" "}
                  {transaction.price}
                </span>
              </div>
              <div className={styles.transactionDate}>
                {transaction.createdAt}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
