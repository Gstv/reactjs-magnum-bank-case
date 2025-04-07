import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { IMaskInput } from "react-imask";

import { api } from "../../services/api";

import styles from "./style.module.css";

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
    },
  });
  const isPixType = watch("transaction_type");
  const navigate = useNavigate();

  function handleCreateTransactions(data: DataProps) {
    const newTransaction = {
      ...data,
      type: "income",
      user_id: 1,
    };

    api
      .post(`transactions`, newTransaction)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });

    reset();
    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateTransactions)}
      className={styles.container}
    >
      <h1>MAGNUM BANK</h1>
      <h2>TRANSFERÊNCIA</h2>

      <div className={styles.saldo}>Saldo atual: R$ 5.000,00</div>

      <label>Selecione o tipo de transação</label>
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

      <label>CPF/CNPJ do favorecido</label>
      <IMaskInput
        mask="000.000.000-00"
        placeholder="000.000.000-00"
        onAccept={(value) => console.log(value)}
        required
        overwrite
        {...register("document")}
      />

      <label>Nome do favorecido</label>
      <input
        type="text"
        placeholder="João Silva"
        required
        {...register("name")}
      />

      {isPixType === "PIX" ? (
        <>
          <label>Chave PIX</label>
          <input
            type="text"
            placeholder="joao@email.com"
            required
            {...register("pix_key")}
          />
        </>
      ) : (
        <>
          <label>Banco</label>
          <input
            type="text"
            placeholder="Banco"
            required
            {...register("bank")}
          />

          <label>Agência</label>
          <IMaskInput
            mask="0000"
            placeholder="4444"
            required
            {...register("agency")}
          />

          <label>Conta</label>
          <IMaskInput
            mask="00000000-0"
            placeholder="03763500-3"
            required
            {...register("account")}
          />
        </>
      )}

      <label>Valor a transferir (R$)</label>
      <IMaskInput
        mask={Number}
        radix=","
        thousandsSeparator="."
        scale={2}
        signed={false}
        padFractionalZeros={true}
        normalizeZeros={true}
        placeholder="300,00"
        required
        {...register("price", { valueAsNumber: true })}
      />

      <label>Data da transferência</label>
      <input type="date" {...register("created_at")} />

      <label>Senha de transação</label>
      <input type="password" required {...register("password")} />

      <button type="submit" disabled={isSubmitting}>
        Confirmar Transferência
      </button>
    </form>
  );
}

export default Transaction;
