import { useEffect } from 'react'
import { GetStaticProps } from "next"
import { getPrismicClient } from '../../../services/prismic';
import { RichText } from 'prismic-dom'
import Head from 'next/head';
import styles from '../post.module.scss'
import Link from 'next/link'
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router';

interface PostPrevieProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}


export default function PostPreview({ post }: PostPrevieProps) {
  const [session] = useSession();
  const router = useRouter()


  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title.length < 40 ? post.title : post.title.substring(0,40)+'...' } | IgNews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.posts}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
           dangerouslySetInnerHTML={{ __html: post.content }}
          />
        <div className={styles.continueReading}>
          Wanna continue Reading?
          <Link href="/">
              <a>Subscribe Now 🤗</a>
          </Link>
        </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  
  const prismic = getPrismicClient()

  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0,3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long', // Mes Escrito por Inteiro
      year: 'numeric' // modo Numerico
    })
  }

  return {
    props: {
      post
    }
  }
}