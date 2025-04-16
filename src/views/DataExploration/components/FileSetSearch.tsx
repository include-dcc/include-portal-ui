import intl from 'react-intl-universal';
import { INDEXES } from 'graphql/constants';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';

import { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import SetSearch from 'components/uiKit/search/SetSearch';
import { SetType } from 'services/api/savedSet/models';

import { DATA_EXPLORATION_QB_ID } from '../utils/constant';

const FileSetSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useFileResolvedSqon(queryBuilderId);

  return (
    <SetSearch
      index={INDEXES.FILE}
      title={intl.get('global.search.fileSet.title')}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      type={SetType.FILE}
      sqon={sqon}
      emptyDescription={intl.get('global.search.fileSet.emptyText')}
    />
  );
};

export default FileSetSearch;
