import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Oops! Page not found.</h2>
      <Link to='/' className={styles.homeButton}>Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
