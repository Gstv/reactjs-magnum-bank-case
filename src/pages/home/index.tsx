import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { api } from "../../services/api";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

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

interface TransactionRequest {
  id: number;
  transaction_type: string;
  type: string;
  price: number;
  created_at: Date;
  user_id: number;
}

function Home() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (user) {
      api
        .get<TransactionRequest[]>(`transactions/?user_id=${user.id}`)
        .then(({ data }) => {
          setTransactions(
            data.map((transaction) => ({
              ...transaction,
              transactionType: transaction.transaction_type,
              createdAt: transaction.created_at,
            }))
          );
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { id } = JSON.parse(storedUser);

      api
        .get(`users/${id}`)
        .then(({ data }) => {
          setUser({
            id: data.id,
            name: data.name,
            balance: data.balance,
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, []);

  function handleNavigateToTransactionPage() {
    navigate("/transaction");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>MAGNUM BANK</header>

      <section className={styles.balanceCard}>
        <h2>Saldo disponível</h2>
        <p className={styles.balance}>{priceFormatter.format(user?.balance)}</p>
      </section>

      <section className={styles.actions}>
        <button onClick={handleNavigateToTransactionPage}>Transferir</button>
        <button onClick={handleLogout}>Sair da conta</button>
      </section>

      <section className={styles.transactions}>
        <h3>Últimas transações</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <div className={styles.transactionDetail}>
                <span>{transaction.transactionType}</span>
                <span className={styles.valueText}>
                  {transaction.type === "income" ? "+" : "-"}
                  {priceFormatter.format(transaction.price)}
                </span>
              </div>
              <div className={styles.transactionDate}>
                {dateFormatter.format(new Date(transaction.createdAt))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
