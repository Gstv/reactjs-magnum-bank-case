import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background: #f9f9f9;
  font-family: Arial, sans-serif;
`;

export const Header = styled.header`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2a64f6;
  margin-bottom: 24px;
`;

export const BalanceCard = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  text-align: center;
`;

export const BalanceText = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

export const ActionsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 32px;
`;

export const TransactionsSection = styled.section`
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  h3 {
    margin-bottom: 12px;
    color: #444;
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
