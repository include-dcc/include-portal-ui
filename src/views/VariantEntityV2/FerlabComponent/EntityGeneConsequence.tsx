import React from 'react';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { IArrangerEdge } from '@ferlab/ui/core/graphql/types';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { EntityExpandableTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { IGeneEntity } from 'graphql/variantsv2/models';

import EntityGeneConsequenceSubtitle from './EntityGeneConsequenceSubtitle';

export interface IEntityGeneConsequences {
  id: string;
  header: string;
  title?: string;
  loading: boolean;
  direction?: 'horizontal' | 'vertical';
  columns: ProColumnType[];
  genes?: IArrangerEdge<IGeneEntity>[];
  //   consequences?: IArrangerEdge<IConsequenceEntity>[];
  dictionary: {
    hideTranscript: string;
    showTranscript: (count: number) => string;
    noDataAvailable: string;
  };
}

export const EntityGeneConsequences = ({
  columns,
  //   consequences,
  dictionary,
  genes,
  header,
  id,
  loading,
  title,
}: IEntityGeneConsequences): JSX.Element => (
  //   console.log('genes', genes);

  //   const geneConsequences = mergeConsequencesWithGenes(consequences || [], genes || []);
  <EntityExpandableTableMultiple
    dictionary={dictionary}
    direction="vertical"
    header={header}
    id={id}
    loading={loading}
    tables={
      genes?.map((gene) => ({
        columns,
        data: hydrateResults(gene.node.consequences.hits.edges), //hydrateResults(gene.node[0].consequences),
        subTitle: (
          <EntityGeneConsequenceSubtitle
            gene={gene}
            dictionary={{
              gene: 'Gene',
              omim: 'Omim',
            }}
            omim={gene.node.omim_gene_id}
            symbol={gene.node.symbol}
          />
        ),
      })) || []
    }
    title={title}
  />
);

export default EntityGeneConsequences;
