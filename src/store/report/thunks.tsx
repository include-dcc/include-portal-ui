import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import keycloak from 'auth/keycloak-api/keycloak';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { INDEXES } from 'graphql/constants';
import { getColumnStateQuery } from 'graphql/reports/queries';
import { startCase } from 'lodash';
import { v4 } from 'uuid';

import { getDefaultContentType } from 'common/downloader';
import { ArrangerApi } from 'services/api/arranger';
import { ArrangerColumnStateResults } from 'services/api/arranger/models';
import { ReportApi } from 'services/api/reports';
import { ReportConfig } from 'services/api/reports/models';
import { globalActions } from 'store/global';

import { TFetchTSVArgs } from './types';

export const SUPPORT_EMAIL = 'support@includedcc.org';

const showErrorReportNotif = (thunkApi: any) =>
  thunkApi.dispatch(
    globalActions.displayNotification({
      type: 'error',
      message: intl.get('api.report.error.title'),
      description: (
        <div>
          {intl.get('api.report.error.message')}
          <a
            style={{ color: 'unset', textDecoration: 'underline' }}
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {intl.get('api.report.error.support')}
          </a>
        </div>
      ),
      duration: 5,
    }),
  );

const fetchReport = createAsyncThunk<
  void,
  {
    data: ReportConfig;
    callback?: () => void;
  },
  { rejectValue: string }
>('report/generateReport', async (args, thunkAPI) => {
  const messageKey = 'report_pending';

  try {
    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'loading',
        key: messageKey,
        content: 'Please wait while we generate your report',
        duration: 0,
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    await ReportApi.generateReport(args.data).then((_) => {
      thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'success',
          message: intl.get('api.report.onSuccess.title'),
          description: intl.get('api.report.onSuccess.fetchReport'),
        }),
      );
    });
  } catch (e) {
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

const fetchTsvReport = createAsyncThunk<void, TFetchTSVArgs, { rejectValue: string }>(
  'report/generate/tsv',
  async (args, thunkAPI) => {
    const messageKey = 'report_pending';

    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'loading',
        key: messageKey,
        content: 'Please wait while we generate your report',
        duration: 0,
      }),
    );

    try {
      const formattedDate = format(new Date(), 'yyyy-MM-dd');
      const formattedFileName = `include-${args.fileName ?? args.index}-table-${formattedDate}.tsv`;

      const { data, error } = await ArrangerApi.columnStates({
        query: getColumnStateQuery(args.index),
        variables: {},
      });

      if (error) {
        showErrorReportNotif(thunkAPI);
        thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
        return thunkAPI.rejectWithValue('error');
      }

      const { downloadData, downloadError } = await fetchTsxReport(args, data!, formattedFileName);

      thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));

      if (downloadError) {
        showErrorReportNotif(thunkAPI);
        return thunkAPI.rejectWithValue('error');
      }

      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'success',
          message: intl.get('api.report.onSuccess.title'),
          description: intl.get('api.report.onSuccess.fetchReport'),
        }),
      );

      saveAs(
        new Blob([downloadData], {
          type: getDefaultContentType('text'),
        }),
        formattedFileName,
      );
    } catch {
      thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
      showErrorReportNotif(thunkAPI);
    }
  },
);

const generateLocalTsvReport = createAsyncThunk<
  void,
  {
    index: string;
    fileName?: string;
    headers: ProColumnType[];
    cols: { key: string; visible: boolean }[];
    rows: any[];
  },
  { rejectValue: string }
>('report/generate/tsv', async (args, thunkAPI) => {
  // !! This function assumes that it is called only when the table is not empty. Said otherwise, data is never empty !!
  const messageKey = 'report_pending';

  try {
    const formattedDate = format(new Date(), 'yyyy-MM-dd');
    const formattedFileName = `include-${args.fileName ?? args.index}-table-${formattedDate}.tsv`;

    const visibleKeys = (args.cols || []).filter((c) => c.visible).map((c) => c.key);
    const visibleHeaders = args.headers.filter((h) => visibleKeys.includes(h.key));
    const visibleTitle = visibleHeaders.map((h) => h.title);
    const visibleRows = (args.rows || []).reduce(
      (rs, r) => [...rs, visibleHeaders.map((h) => r[h.key])],
      [],
    );

    const shapeIsOK = visibleRows.every((r: unknown[]) => r.length === visibleTitle.length);
    if (!shapeIsOK) {
      showErrorReportNotif(thunkAPI);
      return thunkAPI.rejectWithValue('error');
    }

    const doc: string = [visibleTitle, ...visibleRows]
      .reduce((text, row) => text + '\n' + row.join('\t'), '')
      .trimStart();

    saveAs(new Blob([doc], { type: 'text/plain;charset=utf-8' }), formattedFileName);

    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
  } catch {
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

const idField = (index: string) => {
  switch (index) {
    case INDEXES.PARTICIPANT:
      return 'participant_id';
    case INDEXES.FILE:
      return 'file_id';
    case INDEXES.BIOSPECIMEN:
      return 'sample_id';
    default:
      return undefined;
  }
};

const fetchTsxReport = async (
  args: TFetchTSVArgs,
  data: ArrangerColumnStateResults,
  formattedFileName: string,
) => {
  let colStates = args.columnStates
    ? args.columnStates
    : args.columns.map((col, index) => ({
        index,
        key: col.key,
        visible: col.defaultHidden || true,
      }));
  colStates = colStates.filter(({ visible }) => !!visible);

  const columnKeyOrdered = [...colStates].sort((a, b) => a.index - b.index).map(({ key }) => key);
  const tsvColumnsConfig = data!.data[args.index].columnsState.state.columns.filter(({ field }) =>
    colStates.find(({ key }) => key === field),
  );
  const tsvColumnsConfigWithHeader = tsvColumnsConfig.map((column) => ({
    ...column,
    Header: getTitleFromColumns(args.columns, column.field),
  }));

  const sortIdField = idField(args.index);

  const params = new URLSearchParams({
    params: JSON.stringify({
      files: [
        {
          fileName: formattedFileName,
          fileType: 'tsv',
          sqon: args.sqon,
          sort: sortIdField ? [{ field: sortIdField, order: SortDirection.Asc }] : [],
          index: args.index,
          columns: tsvColumnsConfigWithHeader.sort((a, b) =>
            columnKeyOrdered.indexOf(a.field) > columnKeyOrdered.indexOf(b.field) ? 1 : -1,
          ),
        },
      ],
    }),
    httpHeaders: JSON.stringify({
      authorization: `Bearer ${keycloak.token}`,
    }),
    downloadKey: v4(),
  });

  const { data: downloadData, error: downloadError } = await ArrangerApi.download(params);

  return {
    downloadData,
    downloadError,
  };
};

const getTitleFromColumns = (columns: ProColumnType[], field: string) => {
  const column = columns.find(({ key }) => key === field);

  if (!column || (column.title && typeof column.title !== 'string')) {
    return startCase(field.replace(/\./g, ' '));
  }

  return column.title;
};

export { fetchReport, fetchTsvReport, generateLocalTsvReport };
