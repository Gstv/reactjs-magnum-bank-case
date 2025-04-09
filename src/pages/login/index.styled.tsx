import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const ButtonRegister = styled.button`
  font-size: 12px;
  margin-top: 15px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: #1f4ed8;
  }
`;
