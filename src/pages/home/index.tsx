import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { api } from "../../services/api";
import { priceFormatter } from "../../utils/formatter";
import TransactionRow from "../components/TransactionRow";
import Button from "../components/Button";

import {
  ActionsSection,
  BalanceCard,
  BalanceText,
  Header,
  HomeContainer,
  TransactionsSection,
} from "./index.styled";

interface Transaction {
  id: number;
  transactionType: string;
  type: "income" | "outcome";
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
  type: "income" | "outcome";
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
    <HomeContainer>
      <Header>MAGNUM BANK</Header>

      <BalanceCard>
        <h2>Saldo disponível</h2>
        <BalanceText>{priceFormatter.format(user?.balance)}</BalanceText>
      </BalanceCard>

      <ActionsSection>
        <Button onClick={handleNavigateToTransactionPage}>Transferir</Button>
        <Button onClick={handleLogout}>Sair da conta</Button>
      </ActionsSection>

      <TransactionsSection>
        <h3>Últimas transações</h3>
        <ul>
          {transactions.map((transaction) => (
            <TransactionRow
              name={transaction.transactionType}
              type={transaction.type}
              date={transaction.createdAt}
              value={transaction.price}
              key={transaction.id}
            />
          ))}
        </ul>
      </TransactionsSection>
    </HomeContainer>
  );
}

export default Home;
