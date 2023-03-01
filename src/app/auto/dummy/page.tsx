import styles from '../../page.module.css'
import Link from 'next/link';

export default async function DummyHome() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.description}>
          <p>
            Just use the button to soft navigate back to the auto page.
          </p>
          <Link href="/auto" className={styles.card}>
            Soft Navigate Back
          </Link>
        </div>
      </div>
    </main>
  )
}
