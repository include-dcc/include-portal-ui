import { CheckCircleFilled, CheckCircleOutlined, FileTextOutlined } from '@ant-design/icons';
// import { Typography } from 'antd';
import Tree, { DataNode } from 'antd/lib/tree';

import CollectionLogo from 'components/assets/biospecimen/collection.svg';
import ContainerLogo from 'components/assets/biospecimen/container.svg';
import SampleLogo from 'components/assets/biospecimen/sample.svg';

import styles from './index.module.css';

enum NODE_TYPE {
  COLLECTED_SAMPLE = 'collectedSample',
  SAMPLE = 'sample',
  CONTAINER = 'container',
}

interface INode {
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

const convertToDataTree = (data: INode[]): DataNode[] => {
  const treeNodes: DataNode[] = [];
  data.forEach((node: INode) => {
    const treeNode: DataNode = {
      key: node.key,
      title: (
        <>
          {node.key}
          {node.count && ` (${node.count})`}
          {node.hasCollectionAvailability && <CheckCircleOutlined className={styles.checkIcon} />}
          {node.isSampleAvailable && <CheckCircleFilled className={styles.checkIcon} />}
          {node.hasFiles && <FileTextOutlined className={styles.fileIcon} />}
        </>
      ),
      icon: getTypeIcon(node.type),
      children: node.children ? convertToDataTree(node.children) : [],
    };
    treeNodes.push(treeNode);
  });
  return treeNodes;
};

const BiospecimenTree = () => {
  // Call back end ou ça vient dans le biospecimen / participant
  const treeData = convertToDataTree(data);

  return (
    <div>
      {/* <Typography.Title level={4} style={{ marginBottom: '16px' }}>
        Biospecimen tree
      </Typography.Title> */}
      <Tree
        // checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        // onSelect={onSelect}
        // onCheck={onCheck}
        showIcon
        treeData={treeData}
      />
    </div>
  );
};

export default BiospecimenTree;
