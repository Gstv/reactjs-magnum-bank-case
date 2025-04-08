import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { IMaskInput } from "react-imask";

import { api } from "../../services/api";

import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { priceFormatter } from "../../utils/formatter";

interface User {
  id: number;
  name: string;
  balance: number;
  transactionPassword: number;
}

interface BaseProps {
  created_at: Date;
  document: string;
  id: string;
  name: string;
  password: string;
  price: number;
  user_id: number;
  type: string;
}

interface PixProps extends BaseProps {
  transaction_type: "PIX";
  pix_key: string;
}

interface TedProps extends BaseProps {
  transaction_type: "TED";
  account: string;
  agency: string;
  bank: string;
}

type DataProps = PixProps | TedProps;

function Transaction() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<DataProps>({
    defaultValues: {
      transaction_type: "TED",
      price: 0,
    },
  });
  const [user, setUser] = useState<User>();
  const isPixType = watch("transaction_type");
  const priceWatch = watch("price");
  const isSufficientBalance = user?.balance - priceWatch >= 0;
  console.log(isSufficientBalance);
  const navigate = useNavigate();

  async function handleCreateTransactions(data: DataProps) {
    const newTransaction = {
      ...data,
    };

    try {
      const responseUsers = await api.get("users");

      const userSender = responseUsers.data.find(
        (userSenderData) => userSenderData?.id === user.id
      );

      const userReceiver = responseUsers.data.find(
        (userReceiverData) =>
          userReceiverData?.document === newTransaction.document
      );

      // adicionando transaction relacionado ao remetente e depois subtraindo saldo
      await api.post("transactions", {
        ...newTransaction,
        user_id: user?.id,
        type: "outcome",
      });

      await api.patch(`users/${userSender.id}`, {
        balance: userSender?.balance - newTransaction.price,
      });

      // adicionando transaction relacionado ao destinatário (caso exista) e depois somando saldo
      if (userReceiver) {
        await api.post("transactions", {
          ...newTransaction,
          user_id: userReceiver.id,
          type: "income",
        });

        await api.patch(`users/${userReceiver.id}`, {
          balance: userReceiver?.balance + newTransaction.price,
        });
      }
    } catch (error) {
      console.error("Erro ao fazer transação:", error);
    }

    reset();
    navigate("/");
  }

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
            transactionPassword: data.transaction_password,
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleCreateTransactions)}
      className={styles.container}
    >
      <h1>MAGNUM BANK</h1>
      <h2>TRANSFERÊNCIA</h2>

      <div className={styles.saldo}>
        Saldo atual: {priceFormatter.format(user?.balance)}
      </div>

      <label htmlFor="transaction_type">Selecione o tipo de transação</label>
      <div className={styles.radioGroup}>
        <label>
          <input type="radio" {...register("transaction_type")} value="TED" />{" "}
          TED
        </label>
        <label>
          <input type="radio" {...register("transaction_type")} value="PIX" />{" "}
          PIX
        </label>
      </div>

      <label htmlFor="document">CPF/CNPJ do favorecido</label>
      <input placeholder="000.000.000-00" required {...register("document")} />

      <label htmlFor="name">Nome do favorecido</label>
      <input
        type="text"
        placeholder="João Silva"
        required
        {...register("name")}
      />

      {isPixType === "PIX" ? (
        <>
          <label htmlFor="pix_key">Chave PIX</label>
          <input
            type="text"
            placeholder="joao@email.com"
            required
            {...register("pix_key")}
          />
        </>
      ) : (
        <>
          <label htmlFor="bank">Banco</label>
          <input
            type="text"
            placeholder="Banco"
            required
            {...register("bank")}
          />

          <label htmlFor="agency">Agência</label>
          <input placeholder="4444" required {...register("agency")} />

          <label htmlFor="account">Conta</label>
          <input placeholder="03763500-3" required {...register("account")} />
        </>
      )}

      <label htmlFor="price">Valor a transferir (R$)</label>
      <input
        placeholder="300,00"
        required
        {...register("price", { valueAsNumber: true })}
      />
      {!isSufficientBalance && (
        <p className={styles.alertBalance}>Saldo insuficiente!</p>
      )}

      <label htmlFor="date">Data da transferência</label>
      <input type="date" {...register("created_at")} />

      <label htmlFor="password">Senha de transação</label>
      <input type="password" required {...register("password")} />

      <button
        className={styles.buttonSubmit}
        type="submit"
        disabled={isSubmitting || !isSufficientBalance}
      >
        Confirmar Transferência
      </button>
    </form>
  );
}

export default Transaction;
