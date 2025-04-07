import styles from "./style.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <form className={styles.loginBox}>
        <h1>MAGNUM BANK</h1>
        <h2>LOGIN</h2>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" required />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
