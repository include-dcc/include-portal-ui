import React, { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { Button } from 'antd';

import styles from './index.module.css';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLines = 2, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const hiddenTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && hiddenTextRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
        const maxHeight = lineHeight * maxLines;
        const actualHeight = hiddenTextRef.current.scrollHeight;

        setIsOverflowing(actualHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text, maxLines]);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setIsExpanded(!isExpanded);
    event.currentTarget.blur();
  };

  if (!text) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        ref={textRef}
        className={`${styles.text} ${!isExpanded && isOverflowing ? styles.clamped : ''}`}
        style={{
          WebkitLineClamp: !isExpanded && isOverflowing ? maxLines : 'unset',
          display: !isExpanded && isOverflowing ? '-webkit-box' : 'block',
        }}
      >
        {text}
      </div>

      <div ref={hiddenTextRef} className={styles.hiddenText} aria-hidden="true">
        {text}
      </div>

      {isOverflowing && (
        <Button type="link" size="small" onClick={handleToggle} className={styles.toggleButton}>
          {isExpanded ? intl.get('global.seeLess') : intl.get('global.seeMore')}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;
