import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { api } from "../../services/api";
import ResumeLayout from "./components/ResumeLayout";
import { priceFormatter } from "../../utils/formatter";
import Button from "../components/Button";
import Input from "../components/Input";

import {
  AlertInput,
  BalanceCard,
  RadioGroup,
  TransactionContainer,
} from "./index.styled";

interface User {
  id: number;
  name: string;
  balance: number;
  transactionPassword: string;
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
    getValues,
    formState: { isSubmitting },
    reset,
  } = useForm<DataProps>({
    defaultValues: {
      transaction_type: "TED",
      price: 0,
    },
  });
  const [user, setUser] = useState<User>();
  const [openConfirmationPage, setOpenConfirmationPage] = useState(false);
  const isPixType = watch("transaction_type");
  const priceWatch = watch("price");
  const passwordWatch = watch("password");
  const isSufficientBalance = user?.balance - priceWatch >= 0;
  const isIncorrectPassword =
    user?.transactionPassword !== passwordWatch && passwordWatch !== "";
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
    <TransactionContainer onSubmit={handleSubmit(handleCreateTransactions)}>
      {!openConfirmationPage ? (
        <div>
          <h1>MAGNUM BANK</h1>
          <h2>TRANSFERÊNCIA</h2>

          <BalanceCard>
            Saldo atual: {priceFormatter.format(user?.balance)}
          </BalanceCard>

          <label htmlFor="transaction_type">
            Selecione o tipo de transação
          </label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                {...register("transaction_type")}
                value="TED"
              />{" "}
              TED
            </label>
            <label>
              <input
                type="radio"
                {...register("transaction_type")}
                value="PIX"
              />{" "}
              PIX
            </label>
          </RadioGroup>

          <Input
            id="document"
            type="text"
            placeholder="000.000.000-00"
            labelText="CPF/CNPJ do favorecido"
            required
            {...register("document")}
          />

          <Input
            id="name"
            type="text"
            placeholder="João Silva"
            labelText="Nome do favorecido"
            required
            {...register("name")}
          />

          {isPixType === "PIX" ? (
            <Input
              id="pix_key"
              type="text"
              placeholder="joao@email.com"
              labelText="Chave PIX"
              required
              {...register("pix_key")}
            />
          ) : (
            <>
              <Input
                id="bank"
                type="text"
                placeholder="Banco"
                labelText="Banco"
                required
                {...register("bank")}
              />

              <Input
                id="agency"
                type="text"
                placeholder="4444"
                labelText="Agência"
                required
                {...register("agency")}
              />

              <Input
                id="account"
                type="text"
                placeholder="03763500-3"
                labelText="Conta"
                required
                {...register("account")}
              />
            </>
          )}

          <Input
            id="price"
            type="number"
            placeholder="300,00"
            labelText="Valor a transferir (R$)"
            required
            {...register("price", { valueAsNumber: true })}
          />
          {!isSufficientBalance && <AlertInput>Saldo insuficiente!</AlertInput>}

          <Input
            id="created_at"
            type="date"
            labelText="Data da transferência"
            required
            {...register("created_at")}
          />

          <Input
            id="password"
            type="password"
            labelText="Senha de transação"
            required
            {...register("password")}
          />
          {isIncorrectPassword && <AlertInput>Senha incorreta!</AlertInput>}

          <Button
            onClick={() => setOpenConfirmationPage(true)}
            customStyles={{ marginTop: "20px" }}
            disabled={
              isSubmitting || !isSufficientBalance || isIncorrectPassword
            }
          >
            Confirmar Transferência
          </Button>

          <Button
            customStyles={{ marginTop: "20px" }}
            onClick={() => navigate("/")}
          >
            Voltar para home
          </Button>
        </div>
      ) : (
        <ResumeLayout formGetValues={getValues} />
      )}
    </TransactionContainer>
  );
}

export default Transaction;
