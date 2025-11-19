import * as React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <svg width="100px" viewBox="0 0 200 200">
        <linearGradient id="a11">
          <stop offset="0" stopColor="#FF156D" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#FF156D"></stop>
        </linearGradient>
        <circle fill="none" stroke="url(#a11)" strokeWidth="15" strokeLinecap="round"
                strokeDasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" style={{ transformOrigin: 'center' }}>
          <animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2"
                            values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform>
        </circle>
      </svg>
    </div>
  );
}

export default Loader;