import { useNavigate } from 'react-router-dom';
import styles from './NotFoundComponent.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-2);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <button className={styles.backButton} onClick={goBack}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
