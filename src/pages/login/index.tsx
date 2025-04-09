import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import api from "../../services/api";
import Button from "../components/Button";
import Input from "../components/Input";

import { ButtonRegister, LoginContainer, LoginForm } from "./index.styled";

interface FormLoginData {
  name?: string;
  document?: string;
  agency_number?: string;
  account_number?: string;
  pix_key?: string;
  transaction_password?: string;
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormLoginData>();

  const navigate = useNavigate();
  const [registerIn, setRegisterIn] = useState(true);

  const handleLogin = async ({ email, password }: FormLoginData) => {
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error: unknown) {
      alert("Login inválido");
    }
  };

  const handleRegisterIn = async () => {
    const name = getValues("name");
    const document = getValues("document");
    const agency_number = getValues("agency_number");
    const account_number = getValues("account_number");
    const pix_key = getValues("pix_key");
    const transaction_password = getValues("transaction_password");
    const email = getValues("email");
    const password = getValues("password");

    const newUser = {
      name,
      email,
      password,
      agency_number,
      account_number,
      pix_key,
      document,
      transaction_password,
      balance: 0,
    };

    try {
      await api.post("/register", newUser);
      setRegisterIn(true);
    } catch (error: unknown) {
      alert("Cadastro inválido");
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <h1>MAGNUM BANK</h1>
        <h2>LOGIN</h2>

        {registerIn ? (
          <>
            <Input
              id="email"
              type="text"
              labelText="Email"
              required
              {...register("email")}
            />

            <Input
              id="password"
              type="password"
              labelText="Senha"
              required
              {...register("password")}
            />

            <Button type="submit" disabled={isSubmitting}>
              Entrar
            </Button>

            <ButtonRegister type="reset" onClick={() => setRegisterIn(false)}>
              Não tem conta? Cadastre-se aqui
            </ButtonRegister>
          </>
        ) : (
          <>
            <Input
              id="name"
              type="text"
              labelText="Nome"
              required
              {...register("name")}
            />

            <Input
              id="document"
              type="text"
              labelText="Documento (CPF/CNPJ)"
              required
              {...register("document")}
            />

            <Input
              id="agency_number"
              type="text"
              labelText="Agência"
              required
              {...register("agency_number")}
            />

            <Input
              id="account_number"
              type="text"
              labelText="Conta Corrente"
              required
              {...register("account_number")}
            />

            <Input
              id="pix_key"
              type="text"
              labelText="Chave PIX"
              required
              {...register("pix_key")}
            />

            <Input
              id="transaction_password"
              type="text"
              labelText="Senha de transação"
              required
              {...register("transaction_password")}
            />

            <Input
              id="email"
              type="text"
              labelText="Email"
              required
              {...register("email")}
            />

            <Input
              id="password"
              type="password"
              labelText="Senha"
              required
              {...register("password")}
            />

            <Button onClick={() => handleRegisterIn()}>
              Cadastrar e entrar
            </Button>

            <ButtonRegister type="reset" onClick={() => setRegisterIn(true)}>
              Voltar para o início
            </ButtonRegister>
          </>
        )}
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
