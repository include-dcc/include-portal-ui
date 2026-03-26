import React, { useState } from 'react';
import { ExpandAltOutlined, ExpandOutlined } from '@ant-design/icons';

import styles from './index.module.css';

interface ScheduleDiagramImageProps {
  src: string;
  alt: string;
}

const ScheduleDiagramImage: React.FC<ScheduleDiagramImageProps> = ({ src, alt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.diagramContainer}>
      <div
        className={`${styles.imageWrapper} ${isExpanded ? styles.expanded : styles.thumbnail}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={src} alt={alt} className={styles.image} />

        {isHovered && (
          <div className={styles.iconOverlay}>
            {!isExpanded ? (
              <ExpandOutlined className={styles.icon} />
            ) : (
              <ExpandAltOutlined className={styles.icon} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleDiagramImage;
