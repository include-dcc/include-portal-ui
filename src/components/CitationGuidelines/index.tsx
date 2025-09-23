import React from 'react';
import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Button, Popover, Space, Typography } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { ButtonProps } from 'antd/lib/button';

import styles from './index.module.css';

const { Text, Paragraph, Title } = Typography;

interface CitationGuidelinesProps extends Omit<ButtonProps, 'onClick'> {
  buttonText?: string;
  children?: React.ReactNode;
  placement?: TooltipPlacement;
}

const CitationGuidelines: React.FC<CitationGuidelinesProps> = ({
  buttonText,
  children,
  type = 'ghost',
  placement = 'bottom',
  ...buttonProps
}) => {
  const citationContent = (
    <div className={styles.citationContent}>
      <Space direction="vertical" size={16}>
        <Paragraph>
          <Title>{intl.get('components.citationGuidelines.intro')}</Title>
        </Paragraph>
        <Paragraph>
          <Text>
            <span
              className={styles.citationText}
              dangerouslySetInnerHTML={{
                __html: intl.get('components.citationGuidelines.statement'),
              }}
            ></span>
          </Text>
        </Paragraph>
        <ExternalLink
          href="https://help.includedcc.org/docs/citation-statement-for-the-include-data-hub#/"
          className={styles.readMoreLink}
        >
          {intl.get('components.citationGuidelines.readMore')}
        </ExternalLink>
      </Space>
    </div>
  );

  return (
    <Popover
      title={intl.get('components.citationGuidelines.title')}
      content={citationContent}
      trigger="click"
      placement={placement}
      overlayClassName={styles.citationPopover}
      overlayStyle={{ maxWidth: '600px' }}
      arrowPointAtCenter={false}
      autoAdjustOverflow={true}
    >
      {children || (
        <Button type={type} {...buttonProps}>
          {buttonText || intl.get('components.citationGuidelines.buttonText')}
        </Button>
      )}
    </Popover>
  );
};

export default CitationGuidelines;
