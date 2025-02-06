import styles from './Header.module.scss';

type HeaderProps = {
  headerText: string;
};

const Header: React.FC<HeaderProps> = ({ headerText }) => {
  return (
    <header className={styles['header-wrapper']}>
      <h1 className={styles['h1']}>{headerText}</h1>
    </header>
  );
};

export default Header;
