import Image from "next/image";
import styles from "./home.module.css";
import SpinningBall from "@/components/spinningBall/spinningBall";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Statistics for your games.</h1>
        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
          blanditiis adipisci minima reiciendis a autem assumenda dolore.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
      </div>
      <div className={styles.imgContainer}>
        {/* <Image src="/hero.gif" alt="" fill className={styles.heroImg} /> */}
        <SpinningBall />
      </div>
    </div>
  );
};

export default Home;
