import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import Link  from 'next/link'

export function Header(){
  return (
    <header className={styles.headerContainer} >
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="IgNews" />
        <nav>
        <Link href="/">
          <a className={styles.active}>Home</a>
        </Link>
        <Link href="/posts" prefetch> 
          <a>Posts</a>
        </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

// a Props Prefetch Colocada no Component de Link, Serve, Pra na hora que nossa pagina for carregada inicialmente, ele vai carregar
// o link que possui o prefetch junto, quando o usuario for acessar a pagina que esta recebendo o prefetch, ela ja estara carregada