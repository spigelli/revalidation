import styles from '../../page.module.css'
import Link from 'next/link';

export default async function DummyHome() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.description}>
          <p>
            Just use the button to soft navigate back to the force-dynamic page.
          </p>
          <Link href="/force-dynamic" className={styles.card}>
            Soft Navigate Back
          </Link>
        </div>
      </div>
    </main>
  )
}
