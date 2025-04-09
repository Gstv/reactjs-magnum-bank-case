import styled from "styled-components";

export const TransactionContainer = styled.form`
  background: #ffff;
  padding: 24px;
  border-radius: 12px;
  max-width: 700px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

export const BalanceCard = styled.div`
  background: #f1f1f1;
  padding: 8px;
  text-align: center;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8px;

  input {
    margin-right: 6px;
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 4px;
  }
`;

export const AlertInput = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -12px;
`;

export const Text = styled.p`
  margin-bottom: 10px;
`;
