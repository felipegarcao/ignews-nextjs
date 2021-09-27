import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'


export function Header(){

  return (
    <header className={styles.headerContainer} >
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="IgNews" />
        <nav>
        <ActiveLink activeClassName={styles.active} href="/">
          <a>Home</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/posts" prefetch> 
          <a>Posts</a>
        </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

// a Props Prefetch Colocada no Component de Link, Serve, Pra na hora que nossa pagina for carregada inicialmente, ele vai carregar
// o link que possui o prefetch junto, quando o usuário for acessar a pagina que esta recebendo o prefetch, ela ja estará carregada