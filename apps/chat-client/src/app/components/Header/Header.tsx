import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles['container']}>
      <h1>Header</h1>
    </header>
  );
}

export default Header;
