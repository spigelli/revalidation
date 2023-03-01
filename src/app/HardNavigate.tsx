"use dynamic";
import { useRouter } from 'next/navigation';
import styles from './page.module.css'

export default function HardNavigate() {
  const router = useRouter();

  return (
    <button
      className={styles.card}
      onClick={() => router.refresh()}
    >
      <h3>Hard Navigate &rarr;</h3>
    </button>
  );
}


