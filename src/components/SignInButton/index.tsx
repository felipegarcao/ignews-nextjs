import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';


import styles from './styles.module.scss';

export function SignInButton() {

  const isUserLoggedIn = false;
  return isUserLoggedIn ? (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#04D361" />
      Luis Felipe
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#EBA417" />
      Sign in With Github
    </button>
  )
}