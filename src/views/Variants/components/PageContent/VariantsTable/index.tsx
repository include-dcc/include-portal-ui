import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConsequencesCell from '@ferlab/ui/core/components/Consequences/Cell';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import FixedSizeTable from '@ferlab/ui/core/components/FixedSizeTable';
import GeneCell from '@ferlab/ui/core/components/Gene/Cell';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { useFilters } from '@ferlab/ui/core/data/filters/utils';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import {
  IArrangerResultsTree,
  IQueryConfig,
  IQueryResults,
  TQueryConfigCb,
} from '@ferlab/ui/core/graphql/types';
import { numberWithCommas, toExponentialNotation } from '@ferlab/ui/core/utils/numberUtils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import {
  IClinVar,
  IExternalFrequenciesEntity,
  IGeneEntity,
  ITableVariantEntity,
  IVariantEntity,
  IVariantInternalFrequencies,
  IVariantStudyEntity,
} from 'graphql/variants/models';
import { capitalize } from 'lodash';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import { DATA_EXPLORATION_QB_ID, DEFAULT_PAGE_INDEX } from 'views/DataExploration/utils/constant';
import { SCROLL_WRAPPER_ID, VARIANT_SAVED_SETS_FIELD } from 'views/Variants/utils/constants';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import ManeCell from 'components/ManeCell';
import { SetType } from 'services/api/savedSet/models';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import { GnomadCircle, renderClinvar, renderOmim } from './utils';

import styles from './index.module.scss';

interface OwnProps {
  pageIndex: number;
  sqon?: ISqonGroupFilter;
  setPageIndex: (value: number) => void;
  results: IQueryResults<IVariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  queryBuilderId: string;
}

const isNumber = (n: number) => n && !Number.isNaN(n);

const getDefaultColumns = (queryBuilderId: string, noData: boolean = false): ProColumnType[] => [
  {
    title: intl.get('screen.variants.table.variant'),
    key: 'hgvsg',
    dataIndex: 'hgvsg',
    className: noData
      ? `${styles.fixedVariantTableCellNoData} ${styles.fixedVariantTableCellElipsis}`
      : styles.fixedVariantTableCellElipsis,
    sorter: {
      multiple: 1,
    },
    fixed: 'left',
    render: (hgvsg: string, entity: IVariantEntity) =>
      hgvsg ? (
        <Tooltip placement="topLeft" title={hgvsg}>
          <div>
            <Link to={`${STATIC_ROUTES.VARIANTS}/${entity?.locus}`}>{hgvsg}</Link>
          </div>
        </Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    width: 150,
  },
  {
    key: 'variant_class',
    title: intl.get('screen.variants.table.type'),
    dataIndex: 'variant_class',
    sorter: {
      multiple: 1,
    },
    render: (variant_class: string) =>
      variant_class ? (
        <Tooltip
          title={intl
            .get(`entities.variant.type.tooltip.${variant_class.toLowerCase()}`)
            .defaultMessage(capitalize(variant_class))}
        >
          {intl
            .get(`entities.variant.type.abrv.${variant_class.toLowerCase()}`)
            .defaultMessage(capitalize(variant_class))}
        </Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    width: 65,
  },
  {
    key: 'rsnumber',
    title: intl.get('screen.variants.table.dbsnp'),
    dataIndex: 'rsnumber',
    className: styles.dbSnpTableCell,
    sorter: {
      multiple: 1,
    },
    render: (rsNumber: string) =>
      rsNumber ? (
        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}>
          <ExternalLinkIcon />
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    width: 75,
  },
  {
    title: intl.get('screen.variants.table.gene'),
    key: 'genes',
    dataIndex: 'genes',
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const geneSymbol = geneWithPickedConsequence.symbol;
      const geneInfo = genes.hits.edges.find(({ node }) => node.symbol === geneSymbol);

      return (
        <GeneCell
          queryBuilderId={queryBuilderId}
          queryValue={geneSymbol}
          queryIndex={INDEXES.VARIANTS}
          symbol={geneSymbol}
          omimGeneId={geneInfo?.node.omim_gene_id}
        />
      );
    },
    width: 100,
  },
  {
    key: 'consequences',
    title: intl.get('screen.variants.table.consequences.title'),
    dataIndex: 'genes',
    tooltip: intl.get('screen.variants.table.consequences.tooltip'),
    className: noData ? styles.csqCell : '',
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const consequences = geneWithPickedConsequence.consequences?.hits?.edges;
      return (
        <ConsequencesCell
          consequences={consequences}
          emptyText={intl.get('no.data.available')}
          layoutClassName={styles.csqCellLayout}
          symbol={geneWithPickedConsequence.symbol}
          withoutSymbol
        />
      );
    },
    width: 180,
  },

  {
    key: 'MANE',
    title: intl.get('screen.variants.table.mane'),
    dataIndex: 'genes',
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const pickedConsequence = geneWithPickedConsequence.consequences?.hits?.edges?.find(
        (c) => c.node.picked,
      );

      return pickedConsequence ? (
        <ManeCell consequence={pickedConsequence.node} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
    width: 80,
  },
  {
    key: 'omim',
    title: intl.get('screen.variants.table.omim.title'),
    tooltip: intl.get('screen.variants.table.omim.tooltip'),
    dataIndex: 'genes',
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return renderOmim(genes, geneWithPickedConsequence.symbol);
    },
    width: 95,
  },
  {
    key: 'clinvar',
    title: intl.get('screen.variants.table.clinvar'),
    dataIndex: 'clinvar',
    render: (clinVar: IClinVar) => renderClinvar(clinVar),
    width: 92,
  },
  {
    key: 'external_frequencies.gnomad_genomes_3.af',
    title: intl.get('screen.variants.table.gnomAD.title'),
    tooltip: intl.get('screen.variants.table.gnomAD.tooltip'),
    dataIndex: 'external_frequencies',
    sorter: {
      multiple: 1,
    },
    render: (externalFrequencies: IExternalFrequenciesEntity) => {
      const af = externalFrequencies?.gnomad_genomes_3?.af;
      if (!af) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <Space direction="horizontal">
          <GnomadCircle underOnePercent={af < 0.01} />
          <span>{toExponentialNotation(af)}</span>
        </Space>
      );
    },
    width: 90,
  },
  {
    key: 'external_frequencies.gnomad_genomes_3.ac',
    title: intl.get('screen.variants.table.gnomADAlt.title'),
    tooltip: intl.get('screen.variants.table.gnomADAlt.tooltip'),
    dataIndex: 'external_frequencies',
    sorter: {
      multiple: 1,
    },
    render: (externalFrequencies: IExternalFrequenciesEntity) =>
      externalFrequencies?.gnomad_genomes_3?.ac
        ? numberWithCommas(externalFrequencies?.gnomad_genomes_3?.ac)
        : TABLE_EMPTY_PLACE_HOLDER,
    width: 90,
  },
  {
    title: intl.get('screen.variants.table.participant.title'),
    tooltip: intl.get('screen.variants.table.participant.tooltip'),
    key: 'internal_frequencies.total.pc',
    sorter: {
      multiple: 1,
    },
    render: (v: IVariantEntity) => {
      const totalNbOfParticipants = v.internal_frequencies?.total?.pc || 0;
      const studies = v.studies;
      const participantIds =
        studies?.hits?.edges?.map((study) => study.node.participant_ids || [])?.flat() || [];
      if (!participantIds.length) {
        return (
          <>
            {totalNbOfParticipants}
            {v.internal_frequencies?.total?.af && isNumber(v.internal_frequencies.total.af) && (
              <span className={styles.partCell}>
                ({toExponentialNotation(v.internal_frequencies.total.af)})
              </span>
            )}
          </>
        );
      }
      return (
        <>
          {participantIds.length > 10 ? (
            <Link
              to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
              onClick={() => {
                addQuery({
                  queryBuilderId: DATA_EXPLORATION_QB_ID,
                  query: generateQuery({
                    newFilters: [
                      generateValueFilter({
                        field: 'participant_id',
                        value: participantIds,
                        index: INDEXES.PARTICIPANT,
                      }),
                    ],
                  }),
                  setAsActive: true,
                });
              }}
            >
              {numberWithCommas(totalNbOfParticipants)}
            </Link>
          ) : (
            numberWithCommas(totalNbOfParticipants)
          )}
          {v.internal_frequencies?.total?.af && isNumber(v.internal_frequencies.total.af) && (
            <span className={styles.partCell}>
              ({toExponentialNotation(v.internal_frequencies.total.af)})
            </span>
          )}
        </>
      );
    },
    width: 125,
  },
  {
    title: intl.get('screen.variants.table.studies.title'),
    tooltip: intl.get('screen.variants.table.studies.tooltip'),
    dataIndex: 'studies',
    key: 'studies',
    render: (studies: IArrangerResultsTree<IVariantStudyEntity>) => {
      const total = studies?.hits?.total ?? 0;
      if (total == 0) {
        return total;
      }

      const ids = hydrateResults(studies?.hits?.edges || []).map(
        (node: IVariantStudyEntity) => node.study_code,
      );

      return (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() => {
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study.study_code',
                    value: ids,
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            });
          }}
        >
          {numberWithCommas(total)}
        </Link>
      );
    },
    width: 80,
  },
  {
    key: 'CADD',
    title: intl.get('screen.variants.table.CADD.title'),
    tooltip: intl.get('screen.variants.table.CADD.tooltip'),
    dataIndex: 'genes',
    defaultHidden: true,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const pickedConsequence = geneWithPickedConsequence.consequences?.hits?.edges?.find(
        (c) => c.node.picked,
      );
      return pickedConsequence?.node?.predictions?.cadd_score
        ? pickedConsequence.node.predictions.cadd_score
        : TABLE_EMPTY_PLACE_HOLDER;
    },
    width: 90,
  },
  {
    key: 'REVEL',
    title: intl.get('screen.variants.table.revel'),
    dataIndex: 'genes',
    defaultHidden: true,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const pickedConsequence = geneWithPickedConsequence.consequences?.hits?.edges?.find(
        (c) => c.node.picked,
      );
      return pickedConsequence?.node?.predictions?.revel_score
        ? pickedConsequence.node.predictions.revel_score
        : TABLE_EMPTY_PLACE_HOLDER;
    },
    width: 90,
  },
  {
    title: intl.get('screen.variants.table.alt.title'),
    tooltip: intl.get('screen.variants.table.alt.tooltip'),
    dataIndex: ['internal_frequencies', 'total', 'ac'],
    defaultHidden: true,
    key: 'internal_frequencies.total.ac',
    sorter: {
      multiple: 1,
    },
    render: (ac: string) =>
      ac && !isNaN(parseInt(ac)) ? numberWithCommas(parseInt(ac)) : TABLE_EMPTY_PLACE_HOLDER,
    width: 60,
  },
  {
    title: intl.get('screen.variants.table.homozygotes.title'),
    tooltip: intl.get('screen.variants.table.homozygotes.tooltip'),
    dataIndex: 'internal_frequencies',
    defaultHidden: true,
    key: 'internal_frequencies.total.hom',
    sorter: {
      multiple: 1,
    },
    render: (internalFrequencies: IVariantInternalFrequencies) =>
      internalFrequencies.total.hom ? numberWithCommas(internalFrequencies.total.hom) : 0,
    width: 75,
  },
];

const VariantsTable = ({
  results,
  sqon,
  setQueryConfig,
  queryBuilderId,
  queryConfig,
  pageIndex,
  setPageIndex,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const { userInfo } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [selectedRows, setSelectedRows] = useState<IVariantEntity[]>([]);
  const [selectedAllResults, setSelectedAllResults] = useState(false);

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'locus',
              index: INDEXES.VARIANTS,
              value: selectedRows.map((row) => row.locus),
            }),
          ],
        });

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
      // setSelectedRows([]);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  return (
    <GridCard
      content={
        <FixedSizeTable
          elementId="query-builder-header-tools"
          fixedProTable={(dimension) => (
            <ProTable<ITableVariantEntity>
              tableId="variants_table"
              columns={getDefaultColumns(queryBuilderId, results.data.length === 0 ? true : false)}
              enableRowSelection
              initialColumnState={userInfo?.config.variants?.tables?.variants?.columns}
              wrapperClassName={styles.variantTabWrapper}
              loading={results.loading}
              initialSelectedKey={selectedKeys}
              showSorterTooltip={false}
              // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
              onChange={({ current }, _, sorter) => {
                setPageIndex(DEFAULT_PAGE_INDEX);
                setQueryConfig({
                  pageIndex: DEFAULT_PAGE_INDEX,
                  size: queryConfig.size!,
                  sort: formatQuerySortList(sorter),
                });
              }}
              headerConfig={{
                itemCount: {
                  pageIndex: pageIndex,
                  pageSize: queryConfig.size,
                  total: results.total,
                },
                enableColumnSort: true,
                onColumnSortChange: (newState) =>
                  dispatch(
                    updateUserConfig({
                      variants: {
                        tables: {
                          variants: {
                            columns: newState,
                          },
                        },
                      },
                    }),
                  ),
                onSelectAllResultsChange: setSelectedAllResults,
                onSelectedRowsChange: (keys, selectedRows) => {
                  setSelectedKeys(keys);
                  setSelectedRows(selectedRows);
                },
                extra: [
                  <SetsManagementDropdown
                    idField={VARIANT_SAVED_SETS_FIELD}
                    results={results}
                    selectedKeys={selectedKeys}
                    selectedAllResults={selectedAllResults}
                    sqon={getCurrentSqon()}
                    type={SetType.VARIANT}
                    key="variants-set-management"
                  />,
                ],
              }}
              bordered
              size="small"
              scroll={{ x: dimension.x, y: 'max-content' }}
              pagination={{
                current: pageIndex,
                queryConfig,
                setQueryConfig,
                onChange: (page: number) => {
                  scrollToTop(SCROLL_WRAPPER_ID);
                  setPageIndex(page);
                },
                searchAfter: results.searchAfter,
                onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                  dispatch(
                    updateUserConfig({
                      variants: {
                        tables: {
                          variants: {
                            ...userInfo?.config.variants?.tables?.variants,
                            viewPerQuery,
                          },
                        },
                      },
                    }),
                  );
                },
                defaultViewPerQuery: queryConfig.size,
              }}
              dataSource={results.data.map((i) => ({ ...i, key: i.id }))}
              dictionary={getProTableDictionary()}
            />
          )}
        />
      }
    />
  );
};

export default VariantsTable;
