import Link from "next/link";
import styles from "./page.module.css";

// Placeholder until the first screens are designed.
export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My SaaS Project</h1>
      <p>
        Nothing here yet. See the <Link href="/design-system">component set</Link>.
      </p>
    </main>
  );
}
