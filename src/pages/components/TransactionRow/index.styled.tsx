import styled from "styled-components";

interface ValueTextProps {
  type: "income" | "outcome";
}

export const TransactionRowContainer = styled.li`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

export const TransactionDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: #333;
`;

export const TransactionDate = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

export const ValueText = styled.span<ValueTextProps>`
  color: ${(props) => (props.type === "income" ? "green" : "red")};
`;
