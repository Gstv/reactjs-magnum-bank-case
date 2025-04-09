import { dateFormatter, priceFormatter } from "../../../utils/formatter";

import {
  TransactionRowContainer,
  ValueText,
  TransactionDate,
  TransactionDetail,
} from "./index.styled";

interface TransactionRowProps {
  readonly name: string;
  readonly type: "income" | "outcome";
  readonly value: number;
  readonly date: Date;
}

function TransactionRow({
  name,
  type,
  value,
  date,
  ...rest
}: TransactionRowProps) {
  return (
    <TransactionRowContainer {...rest}>
      <TransactionDetail>
        <span>{name}</span>
        <ValueText type={type}>
          {type === "income" ? "+" : "-"}
          {priceFormatter.format(value)}
        </ValueText>
      </TransactionDetail>
      <TransactionDate>{dateFormatter.format(new Date(date))}</TransactionDate>
    </TransactionRowContainer>
  );
}

export default TransactionRow;
