import { ProColumnType, TColumnStates } from '@ferlab/ui/core/components/ProTable/types';

/*
 * This function purpose is to determine if the columns in the user config
 * match those of the table. If one changes a col key in a table than the
 * user config, if used, could lead to incorrect display or action. Table cols must
 * have priority.
 * */
const userColsHaveSameKeyAsDefaultCols = (
  userCols: TColumnStates = [],
  // must never ever be empty
  defaultCols: ProColumnType[],
): boolean => {
  const userColsIsEmpty = userCols?.length === 0;
  const sizeMismatch = userCols.length !== defaultCols.length;
  if (userColsIsEmpty || sizeMismatch) {
    return false;
  }
  const defaultColsKeys = defaultCols.map((c) => c.key);
  return userCols.every((c) => defaultColsKeys.includes(c.key));
};

// Drops entries from a persisted user column state whose key no longer exists
// in defaultCols. Without this, ProTable's initialColumnState can carry stale
// columns (e.g. a column removed from the code but still present in the user's
// server-side config), which causes a visual glitch in the rendered table.
const sanitizeUserColumnState = (
  userCols: TColumnStates | undefined,
  defaultCols: ProColumnType[],
): TColumnStates | undefined => {
  if (!userCols?.length) {
    return undefined;
  }
  const defaultColsKeys = new Set(defaultCols.map((c) => c.key));
  const filtered = userCols.filter((c) => defaultColsKeys.has(c.key));
  return filtered.length ? filtered : undefined;
};

export { sanitizeUserColumnState, userColsHaveSameKeyAsDefaultCols };
