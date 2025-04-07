import styles from "./style.module.css";

function Transaction() {
  return (
    <div className={styles.container}>
      <h1>MAGNUM BANK</h1>
      <h2>TRANSFERÊNCIA</h2>

      <div className={styles.saldo}>Saldo atual: R$ 5.000,00</div>

      <label>Selecione o tipo de transação</label>
      <div className={styles.radioGroup}>
        <label>
          <input type="radio" name="tipo" checked />
          TED
        </label>
        <label>
          <input type="radio" name="tipo" /> PIX
        </label>
      </div>

      <label>CPF/CNPJ do favorecido</label>
      <input type="text" placeholder="000.000.000-00" />

      <label>Nome do favorecido</label>
      <input type="text" placeholder="João Silva" />

      <label>Chave PIX (ou conta/agência TED)</label>
      <input type="text" placeholder="joao@email.com" />

      <label>Valor a transferir (R$)</label>
      <input type="text" placeholder="300,00" />

      <label>Data da transferência</label>
      <input type="date" />

      <label>Senha de transação</label>
      <input type="password" />

      <button>Confirmar Transferência</button>
    </div>
  );
}

export default Transaction;
