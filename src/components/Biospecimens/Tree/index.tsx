import { useEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Button, Card, Descriptions, Input, Popover, Space, Typography } from 'antd';
import Tree, { DataNode } from 'antd/lib/tree';
import cx from 'classnames';

import CollectionLogo from 'components/assets/biospecimen/collection.svg';
import ContainerLogo from 'components/assets/biospecimen/container.svg';
import SampleLogo from 'components/assets/biospecimen/sample.svg';

import {
  getCollectionDetails,
  getContainerDetails,
  getSampleDetails,
  IDescriptionsItem,
} from './utils';

import styles from './index.module.css';

enum NODE_TYPE {
  COLLECTED_SAMPLE = 'collectedSample',
  SAMPLE = 'sample',
  CONTAINER = 'container',
}

export interface INode {
  key: string; // l’id du container / sample / collected sample futur title de l’arbre
  type: string; // pour l’icône du début
  hasCollectionAvailability?: boolean; // pour la collection si au moins un enfant a un sample disponible (icône check outlined vert)
  isSampleAvailable?: boolean; // pour le sample qui a un sample disponible (icône check plein vert)
  count?: number; // Nombre d’enfants directs
  hasFiles?: boolean; // Pour afficher l’icône file si au moins un fichier lié au container
  children?: INode[];
}

const data: INode[] = [
  {
    key: 'bs-6yhjxh2z2w',
    type: 'collectedSample',
    hasFiles: false,
    isSampleAvailable: false,
    count: 2,
    children: [
      {
        key: 'bs-f64m32egpc',
        type: 'sample',
        hasFiles: false,
        isSampleAvailable: false,
        count: 1,
        children: [
          {
            key: 'bs-zr9gxhngdm',
            type: 'sample',
            hasFiles: true,
            isSampleAvailable: false,
            count: 1,
            children: [
              {
                key: 'bs-tkdy3rdgn9',
                type: 'container',
                hasFiles: false,
                isSampleAvailable: false,
                count: 0,
                children: [],
              },
            ],
          },
        ],
      },
      {
        key: 'bs-cwg4gaawzc',
        type: 'sample',
        hasFiles: false,
        isSampleAvailable: false,
        count: 1,
        children: [
          {
            key: 'bs-022kaezw',
            type: 'sample',
            hasFiles: true,
            isSampleAvailable: true,
            count: 1,
            children: [
              {
                key: 'bs-48btn8eg4w',
                type: 'container',
                hasFiles: false,
                isSampleAvailable: false,
                count: 0,
                children: [],
              },
            ],
          },
        ],
      },
    ],

    hasCollectionAvailability: true,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case NODE_TYPE.COLLECTED_SAMPLE:
      return <img alt="collection" src={CollectionLogo} />;
    case NODE_TYPE.SAMPLE:
      return <img alt="sample" src={SampleLogo} />;
    case NODE_TYPE.CONTAINER:
      return <img alt="container" src={ContainerLogo} />;
    default:
      return <></>;
  }
};

const convertToDataTree = (data: INode[], searchValue: string): DataNode[] => {
  const treeNodes: DataNode[] = [];
  const searchValueLowerCase = searchValue.toLowerCase();
  data.forEach((node: INode) => {
    const strTitle = node.key.toLowerCase();
    const index = strTitle.indexOf(searchValueLowerCase);
    const beforeStr = strTitle.substring(0, index);
    const matchStr = strTitle.substring(index, index + searchValue.length);
    const afterStr = strTitle.slice(index + searchValue.length);
    const keyLabel =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className={styles.searchHighlight}>{matchStr}</span>
          {afterStr}
        </span>
      ) : (
        <span>{strTitle}</span>
      );

    const treeNode: DataNode = {
      key: node.key,
      title: (
        <>
          {keyLabel}
          {node.count && node.count > 0 && ` (${node.count})`}
          {node.hasCollectionAvailability && (
            <CheckCircleOutlined className={cx(styles.checkIcon, styles.icon)} />
          )}
          {node.isSampleAvailable && (
            <CheckCircleFilled className={cx(styles.checkIcon, styles.icon)} />
          )}
          {node.hasFiles && <FileTextOutlined className={styles.icon} />}
        </>
      ),
      icon: getTypeIcon(node.type),
      children: node.children ? convertToDataTree(node.children, searchValue) : [],
    };
    treeNodes.push(treeNode);
  });
  return treeNodes;
};

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

const generateList = (
  data: DataNode[],
  dataList: { key: React.Key; title: string }[],
  allKeys: React.Key[],
) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key as string });
    allKeys.push(key);
    if (node.children) {
      generateList(node.children, dataList, allKeys);
    }
  }
};

const getNodeDetails = (key: React.Key, data: INode[]): INode | undefined => {
  let result;
  for (let index = 0; index < data.length; index++) {
    const node = data[index];
    if (node.key === key) {
      result = node;
      break;
    } else if (node.children && !result) {
      result = getNodeDetails(key, node.children);
    }
  }
  return result;
};

const BiospecimenTree = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [descriptions, setDescriptions] = useState<IDescriptionsItem[]>([]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // Call back end ou ça vient dans le biospecimen / participant
  // const treeData = convertToDataTree(data, searchValue);
  const treeData = useMemo(() => convertToDataTree(data, searchValue), [searchValue]);

  const dataList: { key: React.Key; title: string }[] = [];
  const allKeys: React.Key[] = [];
  generateList(treeData, dataList, allKeys);
  useEffect(() => {
    setExpandedKeys(allKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  return (
    <div className={styles.treeViewWrapper}>
      <Card className={styles.treeCard}>
        <Space direction="vertical" size={8} className={styles.treeSpace}>
          <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                placeholder={intl.get('screen.hierarchicalBiospecimen.searchPlaceholder')}
                prefix={<SearchOutlined className={styles.searchIcon} />}
                onChange={onSearch}
                value={searchValue}
                size="small"
                allowClear
              />
            </div>
            <div className={styles.collapseAllWrapper}>
              {expandedKeys.length > 0 ? (
                <Button
                  className={styles.collapseAll}
                  type="link"
                  onClick={() => {
                    setExpandedKeys([]);
                    setSearchValue('');
                  }}
                >
                  {intl.get('screen.hierarchicalBiospecimen.collapseAll')}
                </Button>
              ) : (
                <Button
                  className={styles.collapseAll}
                  type="link"
                  onClick={() => setExpandedKeys(allKeys)}
                >
                  {intl.get('screen.hierarchicalBiospecimen.expandAll')}
                </Button>
              )}
            </div>
          </div>
          <div className={styles.treeWrapper}>
            <Tree
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              showIcon
              treeData={treeData}
              onSelect={(selectedKeys) => {
                setDescriptions([]);
                const nodeDetails = getNodeDetails(selectedKeys[0], data);
                if (nodeDetails?.type) {
                  switch (nodeDetails.type) {
                    case NODE_TYPE.COLLECTED_SAMPLE:
                      setDescriptions(getCollectionDetails(nodeDetails));
                      break;
                    case NODE_TYPE.SAMPLE:
                      setDescriptions(getSampleDetails(nodeDetails));
                      break;
                    case NODE_TYPE.CONTAINER:
                      setDescriptions(getContainerDetails(nodeDetails));
                      break;
                    default:
                      setDescriptions([]);
                      break;
                  }
                }
              }}
            />
          </div>
          <div className={styles.legendWrapper}>
            <Popover
              title={intl.get('screen.hierarchicalBiospecimen.legend.title')}
              content={
                <>
                  <Typography>
                    <img alt="collection" src={CollectionLogo} />
                    {intl.get('screen.hierarchicalBiospecimen.legend.collection')}
                  </Typography>
                  <Typography>
                    <img alt="sample" src={SampleLogo} />
                    {intl.get('screen.hierarchicalBiospecimen.legend.sample')}
                  </Typography>
                  <Typography>
                    <img alt="container" src={ContainerLogo} />
                    {intl.get('screen.hierarchicalBiospecimen.legend.container')}
                  </Typography>
                  <Typography>
                    <FileTextOutlined className={styles.legendIcon} />
                    {intl.get('screen.hierarchicalBiospecimen.legend.fileAvailable')}
                  </Typography>
                  <Typography>
                    <CheckCircleOutlined className={cx(styles.checkIcon, styles.legendIcon)} />
                    {intl.get('screen.hierarchicalBiospecimen.legend.sampleAvailable')}
                  </Typography>
                  <Typography>
                    <CheckCircleFilled className={cx(styles.checkIcon, styles.legendIcon)} />
                    {intl.get('screen.hierarchicalBiospecimen.legend.oneSampleAvailable')}
                  </Typography>
                </>
              }
            >
              <InfoCircleOutlined className={styles.infoIcon} />{' '}
              {intl.get('screen.hierarchicalBiospecimen.legend.title')}
            </Popover>
          </div>
        </Space>
      </Card>
      <div className={styles.detailWrapper}>
        {descriptions.length > 0 && (
          <Descriptions bordered column={1} size="small">
            {descriptions.map((description, index) => (
              <Descriptions.Item
                key={`${description.label}:${index}`}
                label={description.label}
                labelStyle={{ width: '50%' }}
              >
                {description.value || TABLE_EMPTY_PLACE_HOLDER}
              </Descriptions.Item>
            ))}
          </Descriptions>
        )}
      </div>
    </div>
  );
};

export default BiospecimenTree;
