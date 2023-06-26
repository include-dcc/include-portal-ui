import React from 'react';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IArrangerEdge } from '@ferlab/ui/core/graphql/types';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { IGeneEntity } from '../../../graphql/variants/models';

import styles from '@ferlab/ui/core/pages/EntityPage/EntityGeneConsequence/EntityGeneConsequenceSubtitle/index.module.scss';

export interface IGeneConsquenceTableGroup {
  gene: IArrangerEdge<IGeneEntity>;
  omim: string;
  symbol: string;
  ensembleGeneId: string;
}

interface IEntityGeneConsequenceSubtitle extends Omit<IGeneConsquenceTableGroup, 'ensembleGeneId'> {
  dictionary: {
    gene: string;
    omim: string;
  };
}

const EntityGeneConsequenceSubtitle = ({
  gene,
  dictionary,
  omim,
  symbol,
}: IEntityGeneConsequenceSubtitle): React.ReactElement => (
  <div className={styles.wrapper}>
    <span>
      <span className={styles.bold}>{dictionary.gene}</span>
      <ExternalLink
        className={styles.link}
        href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}
      >
        {symbol}
      </ExternalLink>
    </span>
    {omim && (
      <span>
        <span className={styles.separator}>|</span>
        <span className={styles.bold}>{dictionary.omim}</span>
        <ExternalLink className={styles.link} href={`https://omim.org/entry/${omim}`}>
          {omim}
        </ExternalLink>
      </span>
    )}
    <span className={styles.bold}>
      <span className={styles.separator}>|</span>
      {removeUnderscoreAndCapitalize(gene.node.biotype)}
    </span>
  </div>
);

export default EntityGeneConsequenceSubtitle;
