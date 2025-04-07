import styles from "./style.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>MAGNUM BANK</header>

      <section className={styles.balanceCard}>
        <h2>Saldo disponível</h2>
        <p className={styles.balance}>R$ 5.000,00</p>
      </section>

      <section className={styles.actions}>
        <button>Transferir</button>
        <button>Pagar</button>
      </section>

      <section className={styles.transactions}>
        <h3>Últimas transações</h3>
        <ul>
          <li>
            <div className={styles.transactionDetail}>
              <span>Pagamento - Conta de luz</span>
              <span className={styles.negative}>-R$ 200,00</span>
            </div>
            <div className={styles.transactionDate}>05/04/2025</div>
          </li>
          <li>
            <div className={styles.transactionDetail}>
              <span>PIX recebido - Ana</span>
              <span className={styles.positive}>+R$ 300,00</span>
            </div>
            <div className={styles.transactionDate}>04/04/2025</div>
          </li>
          <li>
            <div className={styles.transactionDetail}>
              <span>Saque 24h</span>
              <span className={styles.negative}>-R$ 500,00</span>
            </div>
            <div className={styles.transactionDate}>03/04/2025</div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
