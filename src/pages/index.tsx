import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
 product: {
  priceId: string;
  amount: number;
 }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
    <Head>
      <title>Home | ig.news</title>
    </Head>
    <main className={styles.contentContainer} >
      <section className={styles.hero}>
        <span>👏 Hey, Welcome</span>
        <h1>News About <br />the <span>React</span> World</h1>
        <p>
          Get access to all the Publications <br />
          <span>For {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>
      <img src="/images/avatar.svg" alt="Girl Coding" />
    </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JKUdVJdYbTTbvhP6qaQ3g7j')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
    
  }
  
  return {
    props: {
      product,
    }
  }
}
