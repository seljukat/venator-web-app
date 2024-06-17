import LoginForm from "@/components/loginForm/loginForm";
import { handleGoogleLogin } from "@/lib/action";
import styles from "./login.module.css";

const LoginPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form> */}
        <form action={handleGoogleLogin}>
          <button className={styles.github}>Login with Google</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
