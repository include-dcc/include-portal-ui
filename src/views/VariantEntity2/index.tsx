import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import { NO_GENE } from '@ferlab/ui/core/components/Consequences/Cell';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import EntityPageWrapper, { EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import EntityNestedTable from '@ferlab/ui/core/pages/EntityPage/EntityNestedTable';
import EntityVariantSummary from '@ferlab/ui/core/pages/EntityPage/EntityVariantSummary';
import { Tag } from 'antd';

import LineStyleIcon from 'components/Icons/LineStyleIcon';

import { useVariantEntity } from '../../graphql/variants/actions';

import { expandedRowRender, getColumn } from './utils/consequence';
import { getSummaryItems } from './utils/summary';

import styles from './index.module.scss';

enum SectionId {
  SUMMARY = 'summary',
  CONSEQUENCE = 'consequence',
  FREQUENCY = 'frequency',
  PATHOGENICITY = 'pathogenicity',
  CONDITION = 'condition',
}

export default function VariantEntity() {
  const { locus } = useParams<{ locus: string }>();

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('screen.variants.summary.summary') },
    {
      href: `#${SectionId.CONSEQUENCE}`,
      title: intl.get('screen.variants.consequences.consequence'),
    },
    { href: `#${SectionId.FREQUENCY}`, title: intl.get('screen.variants.frequencies.frequency') },
    {
      href: `#${SectionId.PATHOGENICITY}`,
      title: intl.get('screen.variants.pathogenicity.pathogenicity'),
    },
    {
      href: `#${SectionId.CONDITION}`,
      title: intl.get('screen.variants.conditions.title'),
    },
  ];

  const { data, loading } = useVariantEntity({
    field: 'locus',
    values: locus ? [locus] : [],
  });

  const geneSymbolOfPicked = data?.genes?.hits?.edges?.find((e) =>
    (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
  )?.node?.symbol;

  return (
    <EntityPageWrapper
      pageId="variant-entity-page"
      links={links}
      data={data}
      loading={loading}
      emptyText={intl.get('no.data.available')}
    >
      <>
        <EntityTitle
          text={data?.hgvsg}
          icon={<LineStyleIcon className={styles.titleIcon} />}
          loading={loading}
          tag={
            <>
              <Tag>{data?.assembly_version}</Tag>
              <Tag className={styles.variantTag}>
                {intl.get('screen.variants.summary.germline')}
              </Tag>
            </>
          }
        />

        <EntityVariantSummary
          id={SectionId.SUMMARY}
          loading={loading}
          data={getSummaryItems(data)}
          noDataLabel={intl.get('no.data.available')}
        />

        <EntityNestedTable
          columns={getColumn(geneSymbolOfPicked)}
          data={hydrateResults(data?.genes?.hits?.edges || []).filter(
            (gene) => gene.symbol !== NO_GENE,
          )}
          expandedRowRender={expandedRowRender}
          id={SectionId.CONSEQUENCE}
          loading={loading}
          title={intl.get('screen.variants.consequences.consequence')}
          header={intl.get('screen.variants.consequences.transcripts')}
          noDataLabel={intl.get('no.data.available')}
        />
      </>
    </EntityPageWrapper>
  );
}
