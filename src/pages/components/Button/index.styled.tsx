import styled from "styled-components";

export const ButtonStyled = styled.button`
  width: 100%;
  background-color: #2a64f6;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1f4ed8;
  }

  &:disabled {
    background-color: #688ff1;
    cursor: not-allowed;
  }
`;
