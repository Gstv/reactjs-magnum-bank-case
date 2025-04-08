import { dateFormatter, priceFormatter } from "../../../utils/formatter";

import styles from "../style.module.css";

interface ResumeLayoutProps {
  readonly formGetValues: () => {
    document: string;
    name: string;
    price: number;
    agency: string;
    bank: string;
    account: string;
    created_at: string;
    transaction_type: string;
  };
}

function ResumeLayout({ formGetValues }: ResumeLayoutProps) {
  const {
    document,
    name,
    price,
    agency,
    bank,
    account,
    created_at,
    transaction_type,
  } = formGetValues();

  return (
    <div>
      <h1>MAGNUM BANK</h1>
      <h2>CONFIRMAÇÃO</h2>

      <h4>Documento do favorecido</h4>
      <p className={styles.resumeLayoutText}>{document}</p>

      <h4>Nome do favorecido</h4>
      <p className={styles.resumeLayoutText}>{name}</p>

      {transaction_type === "TED" && (
        <>
          <h4>Banco</h4>
          <p className={styles.resumeLayoutText}>{bank}</p>

          <h4>Conta</h4>
          <p className={styles.resumeLayoutText}>{account}</p>

          <h4>Agência</h4>
          <p className={styles.resumeLayoutText}>{agency}</p>
        </>
      )}

      <h4>Valor</h4>
      <p className={styles.resumeLayoutText}>{priceFormatter.format(price)}</p>

      <h4>Data</h4>
      <p className={styles.resumeLayoutText}>
        {dateFormatter.format(new Date(created_at))}
      </p>

      <h4>Tipo:</h4>
      <p className={styles.resumeLayoutText}>{transaction_type}</p>

      <button className={styles.buttonSubmit} type="submit">
        {" "}
        Confirmar transferência
      </button>
    </div>
  );
}

export default ResumeLayout;
