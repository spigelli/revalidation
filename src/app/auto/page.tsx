import styles from '../page.module.css'
import { cache, Suspense } from 'react';
import Link from 'next/link';
import { default as d } from 'next/dynamic';

const CurrentTimeDifference = d(() => import('../CurrentTimeDifference'), { ssr: false });
const HardNavigate = d(() => import('../HardNavigate'), { ssr: false });

export const revalidate = 5;
export const dynamic = 'auto';

const getTime = cache(async () => {
  const datetime = new Date()
  const time = datetime.toLocaleTimeString()
  return { time, datetime }
});

const getTimeNoCache = async () => {
  const datetime = new Date()
  const time = datetime.toLocaleTimeString()
  return { time, datetime }
};

const getTimeFetch = async () => {
  const response = await fetch(`${process.env.BASE_FETCH_URL}/api/time`, {
    next: {
      revalidate: 5,
    },
  });
  const { time, datetime } = await response.json();
  return { time, datetime: new Date(datetime) }
};

export default async function Home() {
  const { time, datetime } = await getTime();
  const { 
    time: timeNoCache,
    datetime: datetimeNoCache
  } = await getTimeNoCache();
  const {
    time: timeFetch,
    datetime: datetimeFetch
  } = await getTimeFetch();
  return (
    <main className={styles.main}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '30%',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/auto">
          Auto
        </Link>
        <Link href="/force-static">
          Force Static
        </Link>
        <Link href="/force-dynamic">
          Force Dynamic
        </Link>
      </div>

      <div className={styles.description}>
        <p>
          export const dynamic = &lsquo;auto&lsquo;;
          export const revalidate = 5;
        </p>
      </div>

      <div className={styles.center}>
        <div className={styles.description}>
          <p>
              The current cached time is {time}{' \n'}
              The difference between the current time and the last render time is {(new Date().getTime() - datetime.getTime())} ms
            <Suspense fallback={<p>Loading...</p>}>
              {/* <CurrentTimeDifference time={datetime.getTime()} /> */}
            </Suspense>
          </p>
          <p>
              The current cached time without using react&lsquo;s cache function is {timeNoCache}{' \n'}
              The difference between the current time and the last render time is {(new Date().getTime() - datetimeNoCache.getTime())} ms
            <Suspense fallback={<p>Loading...</p>}>
              {/* <CurrentTimeDifference time={datetimeNoCache.getTime()} /> */}
            </Suspense>
          </p>
          <p>
              The current cached time using fetch with <code>{'{ next: { revalidate: 5 } }'}</code> is {timeFetch}{' \n'}
              The difference between the current time and the last render time is {(new Date().getTime() - datetimeFetch.getTime())} ms
            <Suspense fallback={<p>Loading...</p>}>
              {/* <CurrentTimeDifference time={datetimeFetch.getTime()} /> */}
            </Suspense>
          </p>
          <Link href="/auto/dummy" className={styles.card}>
            Soft Navigate
          </Link>
          <Suspense fallback={<p>Loading...</p>}>
            {/* <HardNavigate /> */}
          </Suspense>
        </div>
      </div>
    </main>
  )
}
