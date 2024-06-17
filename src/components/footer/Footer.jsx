import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Venator</div>
      <div className={styles.text}>
        Venator statistics agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
