import CollapseLikeFacet from 'components/uiKit/FilterList/CollapseLikeFacet.tsx';
import { Col, Modal, Row, Spin, Tooltip, Transfer, Tree } from 'antd';
import intl from 'react-intl-universal';
import { useEffect, useRef, useState } from 'react';
import {
  getFlattenTree,
  TreeNode,
  removeSameTerms,
} from 'views/DataExploration/utils/OntologyTree';
import { PhenotypeStore } from 'views/DataExploration/utils/PhenotypeStore';
import {
  addFieldToActiveQuery,
  findSqonValueByField,
  removeValueFilterFromSqon,
} from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useHistory } from 'react-router-dom';
import { BranchesOutlined, UserOutlined } from '@ant-design/icons';
import { updateQueryFilters } from '@ferlab/ui/core/data/filters/utils';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { findChildrenKey, generateTree, getExpandedKeys, isChecked, searchInTree } from './helpers';
import Empty from '@ferlab/ui/core/components/Empty';
import { isEmpty } from 'lodash';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';

import styles from './index.module.scss';

const FIELD_NAME = 'observed_phenotype.name';
const AUTO_EXPAND_TREE = 1;
const MIN_SEARCH_TEXT_LENGTH = 3;

const HpoTreeFacet = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const phenotypeStore = useRef(new PhenotypeStore());
  const [rootNode, setRootNode] = useState<TreeNode>();
  const [treeData, setTreeData] = useState<TreeNode>();
  const history = useHistory();
  const { sqon } = useParticipantResolvedSqon();

  const getInitialExpandedKeys = (data: TreeNode[], collectedKeys: string[] = [], counter = 0) => {
    if (counter < AUTO_EXPAND_TREE) {
      data.forEach((node) => {
        counter++;
        collectedKeys.push(node.key);
        if (node.children) {
          getInitialExpandedKeys(node.children, collectedKeys, counter);
        }
      });
    }
    return collectedKeys;
  };

  const checkKeys = (
    key: string | number,
    dataSource = treeData ? [treeData] : [],
    accu: { check: string[]; halfcheck: string[] } = {
      check: [],
      halfcheck: [],
    },
  ) => {
    dataSource.forEach((o) => {
      if (o.key === key) {
        return accu.check.push(o.key);
      }

      if (accu.check.length === 0) {
        checkKeys(key, o.children, accu);

        if (accu.check.length > 0) {
          accu.halfcheck.push(o.key);
        }
      }
    });
    return accu;
  };

  const onCheckOrSelect = (
    onItemSelect: any,
    key: string,
    checkedKeys: string[],
    children: TreeNode[],
  ) => {
    const hasChildAlreadyChecked = findChildrenKey(checkedKeys, children);
    onItemSelect(key.toString(), !isChecked(checkedKeys, key.toString()));
    setTargetKeys(removeSameTerms([], hasChildAlreadyChecked ? [key] : [...checkedKeys, key]));
  };

  useEffect(() => {
    if (visible) {
      const filteredParticipantSqon = removeValueFilterFromSqon(FIELD_NAME, sqon);

      setIsLoading(true);
      phenotypeStore.current.fetch('observed_phenotype', filteredParticipantSqon).then(() => {
        const rootNode = phenotypeStore.current.getRootNode()!;

        setIsLoading(false);

        if (rootNode) {
          setTreeData(rootNode);
          setRootNode(rootNode);

          const flatTree = getFlattenTree(rootNode!);
          const selectedValues = findSqonValueByField(FIELD_NAME, sqon);

          if (selectedValues) {
            const targetKeys = flatTree
              .filter(({ title }) => selectedValues.includes(title))
              .map(({ key }) => key);

            setExpandedKeys(getExpandedKeys(targetKeys));
            setTargetKeys(removeSameTerms([], targetKeys));
          } else {
            setExpandedKeys(getInitialExpandedKeys([rootNode!]));
            setTargetKeys([]);
          }
        }
      });
    }

    // eslint-disable-next-line
  }, [visible]);

  return (
    <>
      <CollapseLikeFacet
        title={intl.get('facets.observed_phenotype.name')}
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        wrapClassName={styles.hpoTreeModalWrapper}
        className={styles.hpoTreeModal}
        title={intl.get('screen.dataExploration.hpoTree.modal.title')}
        okText={intl.get('screen.dataExploration.hpoTree.modal.okText')}
        okButtonProps={{ disabled: isEmpty(targetKeys) && isEmpty(treeData) }}
        onOk={() => {
          const flatTreeData = getFlattenTree(treeData!);
          const results = flatTreeData
            .filter(({ key }) => targetKeys.includes(key))
            .map(({ title }) => title);

          if (!results || results.length === 0) {
            setExpandedKeys(getInitialExpandedKeys([treeData!]));
            updateQueryFilters(history, FIELD_NAME, []);
          } else {
            addFieldToActiveQuery({
              field: FIELD_NAME,
              value: results,
              history,
              index: INDEXES.PARTICIPANT,
              merge_stategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
            });
          }

          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
          setTreeData(undefined);
          setRootNode(undefined);
        }}
      >
        <Transfer<TreeNode>
          className={styles.hpoTransfer}
          showSearch={!isEmpty(treeData)}
          targetKeys={targetKeys}
          selectedKeys={[]}
          oneWay
          onChange={(targetKeys, direction) => {
            if (direction === 'left') {
              setTargetKeys(targetKeys);
            }
          }}
          onSearch={(_, value) => {
            if (value && value.length > MIN_SEARCH_TEXT_LENGTH) {
              const hits: string[] = [];
              const tree = JSON.parse(JSON.stringify(treeData));
              searchInTree(value, tree, hits);
              setExpandedKeys(hits);
              setTreeData(tree);
            } else {
              setExpandedKeys(getInitialExpandedKeys([rootNode!]));
              setTreeData(rootNode);
            }
          }}
          locale={{
            searchPlaceholder: intl.get('screen.dataExploration.hpoTree.searchPlaceholder'),
            notFoundContent: (
              <Empty
                imageType="grid"
                description={intl.get('screen.dataExploration.hpoTree.emptySelection')}
              />
            ),
          }}
          filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
          onSelectChange={(s, t) => {
            setTargetKeys(
              removeSameTerms(
                [],
                targetKeys.filter((el) => {
                  return !t.includes(el);
                }),
              ),
            );
          }}
          dataSource={treeData ? getFlattenTree(treeData) : []}
          render={(item) => item.title}
          showSelectAll={false}
          operationStyle={{ visibility: 'hidden', width: '5px' }}
        >
          {({ direction, onItemSelect, selectedKeys }) => {
            if (direction === 'left') {
              const checkedKeys = [...removeSameTerms(selectedKeys, targetKeys)];
              const halfCheckedKeys = checkedKeys
                .map((k) => checkKeys(k))
                .flatMap((k) => k.halfcheck);
              return (
                <Spin spinning={isLoading}>
                  {isEmpty(treeData) ? (
                    <Empty imageType="grid" />
                  ) : (
                    <>
                      <Row justify="space-between" className={styles.phenotypeTreeHeader}>
                        <Col></Col>
                        <Col>
                          <Row style={{ width: 100 }}>
                            <Col span={12} className={styles.phenotypeTreeCountTag}>
                              <Tooltip
                                title={intl.get('screen.dataExploration.hpoTree.tags.exact')}
                              >
                                <UserOutlined />
                              </Tooltip>
                            </Col>
                            <Col span={12} className={styles.phenotypeTreeCountTag}>
                              <Tooltip title={intl.get('screen.dataExploration.hpoTree.tags.all')}>
                                <BranchesOutlined />
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Tree
                        checkable
                        checkStrictly
                        height={600}
                        expandedKeys={expandedKeys}
                        onExpand={(keys) => setExpandedKeys(keys as string[])}
                        checkedKeys={{
                          checked: checkedKeys,
                          halfChecked: halfCheckedKeys,
                        }}
                        titleRender={(node) => node.name}
                        treeData={treeData ? generateTree([treeData], checkedKeys) : []}
                        onCheck={(_, { node: { key, children } }) =>
                          onCheckOrSelect(
                            onItemSelect,
                            key as string,
                            checkedKeys,
                            children as TreeNode[],
                          )
                        }
                        onSelect={(_, { node: { key, children } }) =>
                          onCheckOrSelect(
                            onItemSelect,
                            key as string,
                            checkedKeys,
                            children as TreeNode[],
                          )
                        }
                      />
                    </>
                  )}
                </Spin>
              );
            }
          }}
        </Transfer>
      </Modal>
    </>
  );
};

export default HpoTreeFacet;
