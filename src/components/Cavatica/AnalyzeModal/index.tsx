import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { PlusOutlined } from '@ant-design/icons';
import {
  CAVATICA_TYPE,
  ICavaticaTreeNode,
} from '@ferlab/ui/core/components/Widgets/Cavatica/CavaticaAnalyzeModal';
import { ICavaticaProjects } from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import { Button, Divider, Modal, ModalFuncProps, Space, TreeSelect, Typography } from 'antd';
import { LegacyDataNode } from 'rc-tree-select/lib/TreeSelect';

import styles from './index.module.css';

export type TDictionaryAnalyzeModal = {
  contentNotFound: string;
  contentText: string;
  newProjectButton: string;
  okText: string;
  selectPlaceholder: string;
  title: string;
};

export interface IAnalyzeModal extends ModalFuncProps {
  dictionary: TDictionaryAnalyzeModal;
  handleCreateProjectClick: () => void;
  handleFilesAndFolders: (parentId: string, isProject: boolean) => any;
  handleSubmit: (value: ICavaticaTreeNode) => void;
  onClose: () => void;
  open: boolean;
  projects: ICavaticaProjects;
}

interface INewProjectButtonProps {
  label: string;
  onClick: () => void;
}

const NewProjectButton = ({ label, onClick }: INewProjectButtonProps) => (
  <Button icon={<PlusOutlined />} onClick={onClick} size="small">
    {label}
  </Button>
);

const AnalyzeModal = ({
  dictionary,
  handleCreateProjectClick,
  handleFilesAndFolders,
  handleSubmit,
  onClose,
  open,
  projects,
}: IAnalyzeModal): JSX.Element => {
  const [selectedTreeNode, setSelectedTreeNode] = useState<ICavaticaTreeNode | undefined>();
  const [localProjectTree, setLocalProjectTree] = useState<ICavaticaTreeNode[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onLoadData = async (node: LegacyDataNode) => {
    const { data } = await handleFilesAndFolders(node.id, node.type === CAVATICA_TYPE.PROJECT);

    const childs =
      data?.items
        .filter(({ type }: { type: CAVATICA_TYPE }) => type !== CAVATICA_TYPE.FILE)
        .map((child: any) => ({
          ...child,
          pId: node.id,
          title: child.name,
          value: child.id,
        })) || [];

    setLocalProjectTree([...localProjectTree, ...childs]);
  };

  useEffect(() => {
    setLocalProjectTree(
      projects.data.map((project) => ({
        ...project,
        pId: 0,
        title: project.name,
        type: CAVATICA_TYPE.PROJECT,
        value: project.id,
      })),
    );
  }, [projects.data]);

  return (
    <Modal
      title={dictionary.title}
      destroyOnClose
      okButtonProps={{
        disabled: selectedTreeNode === undefined,
      }}
      okText={dictionary.okText}
      onOk={() => {
        if (selectedTreeNode) {
          handleSubmit(selectedTreeNode);
        }
      }}
      onCancel={onClose}
      open={open}
      wrapClassName={styles.cavaticaModalWrapper}
    >
      <Space className={styles.treeSelectorWrapper} direction="vertical" size={24}>
        <Typography.Text>{dictionary.contentText}</Typography.Text>
        <TreeSelect
          allowClear
          className={styles.treeSelector}
          dropdownRender={(menu) => (
            <>
              <div className={styles.cavaticaTreeDropdownMenu}>{menu}</div>
              {localProjectTree.length > 0 && (
                <>
                  <Divider className={styles.cavaticaTreeDropdownDivider} />
                  <div className={styles.cavaticaTreeDropdownFooter}>
                    <NewProjectButton
                      label={dictionary.newProjectButton}
                      onClick={handleCreateProjectClick}
                    />
                  </div>
                </>
              )}
            </>
          )}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          loadData={onLoadData}
          notFoundContent={
            <Space align="center" className={styles.treeSelectEmpty} direction="vertical" size={16}>
              <Typography.Text type="secondary">
                {intl.get('screen.studies.ndaGuids.cavaticaModal.createProjectToPushFileTo')}
              </Typography.Text>
              <NewProjectButton
                label={dictionary.newProjectButton}
                onClick={handleCreateProjectClick}
              />
            </Space>
          }
          onClear={() => {
            setSelectedTreeNode(undefined);
          }}
          onDropdownVisibleChange={setDropdownOpen}
          onSelect={(_: any, node: ICavaticaTreeNode) => {
            setSelectedTreeNode(node);
          }}
          open={dropdownOpen}
          placeholder={dictionary.selectPlaceholder}
          popupClassName={styles.cavaticaTreeDropdown}
          showAction={['focus']}
          showSearch
          treeData={localProjectTree}
          treeDataSimpleMode
          value={selectedTreeNode?.value}
        />
      </Space>
    </Modal>
  );
};

export default AnalyzeModal;
