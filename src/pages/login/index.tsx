import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import styles from "./style.module.css";

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
    <div className={styles.container}>
      <form className={styles.loginBox} onSubmit={handleSubmit(handleLogin)}>
        <h1>MAGNUM BANK</h1>
        <h2>LOGIN</h2>

        {registerIn ? (
          <>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} />

            <label htmlFor="password">Senha</label>
            <input type="password" {...register("password")} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.buttonSubmit}
            >
              Entrar
            </button>

            <button
              type="reset"
              className={styles.buttonRegisterIn}
              onClick={() => setRegisterIn(false)}
            >
              Não tem conta? Cadastre-se aqui
            </button>
          </>
        ) : (
          <>
            <label htmlFor="name">Nome</label>
            <input type="name" {...register("name")} />

            <label htmlFor="document">Documento (CPF/CNPJ)</label>
            <input type="document" {...register("document")} />

            <label htmlFor="name">Agência</label>
            <input type="agency_number" {...register("agency_number")} />

            <label htmlFor="account_numbere">Conta Corrente</label>
            <input type="account_number" {...register("account_number")} />

            <label htmlFor="pix_key">Chave PIX</label>
            <input type="pix_key" {...register("pix_key")} />

            <label htmlFor="transaction_password">Senha de transação</label>
            <input
              type="transaction_password"
              {...register("transaction_password")}
            />

            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} />

            <label htmlFor="password">Senha</label>
            <input type="password" {...register("password")} />

            <button
              className={styles.buttonSubmit}
              onClick={() => handleRegisterIn()}
            >
              Cadastrar e entrar
            </button>

            <button
              type="reset"
              className={styles.buttonRegisterIn}
              onClick={() => setRegisterIn(true)}
            >
              Voltar para o início
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Login;
