import { dateFormatter, priceFormatter } from "../../../utils/formatter";
import Button from "../../components/Button";

import { Text } from "../index.styled";

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
      <Text>{document}</Text>

      <h4>Nome do favorecido</h4>
      <Text>{name}</Text>

      {transaction_type === "TED" && (
        <>
          <h4>Banco</h4>
          <Text>{bank}</Text>

          <h4>Conta</h4>
          <Text>{account}</Text>

          <h4>Agência</h4>
          <Text>{agency}</Text>
        </>
      )}

      <h4>Valor</h4>
      <Text>{priceFormatter.format(price)}</Text>

      <h4>Data</h4>
      <Text>{dateFormatter.format(new Date(created_at))}</Text>

      <h4>Tipo:</h4>
      <Text>{transaction_type}</Text>

      <Button type="submit">Confirmar transferência</Button>
    </div>
  );
}

export default ResumeLayout;
