import Header from '@/components/layout/header/Header.tsx';
import { Button, Typography } from '@mui/material';
import styles from './ErrorBoundaryPage.module.scss';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '@/utils/paths.ts';

export const ErrorBoundaryPage = () => {
  const navigate = useNavigate();

  const handleMainClick = useCallback(() => {
    navigate(Paths.MAIN);
  }, [navigate]);

  return (
    <>
      <Header/>
      <div className={styles.page}>
        <div className={styles.picture}/>
        <div className={styles.text}>
          <Typography variant="h1" className={styles.p}>You get error</Typography>
        </div>
        <div>
          <Button variant="text" onClick={handleMainClick}>
            Ok
          </Button>
        </div>
      </div>
    </>
  );
};