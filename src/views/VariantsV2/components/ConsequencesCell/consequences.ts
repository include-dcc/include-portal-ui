import { IArrangerEdge } from '@ferlab/ui/core/graphql/types';
import { IConsequenceEntity } from 'graphql/variantsv2/models';

const keyNoSymbol = 'noSymbol_';

/*
 * Algorithm:
 *   Input: consequences
 *   #=====#
 *   - IF consequence has NO gene (symbol) then keep it;
 *   - IF consequence has multiple symbols, then keep one consequence per symbol.
 *   - IF consequence has a symbol filter accordingly to these rules:
 *      for a given symbol,
 *        find consequence with highest score s
 *        IF multiple consequences with same score s then find the one that is canonical
 *          IF canonical does not exist then grab whatever consequence with score s.
 *   #=====#
 *   Output: filtered consequences.
 * */
export const filterThanSortConsequencesByImpact = (
  consequences: IArrangerEdge<IConsequenceEntity>[],
) => {
  if (!consequences || consequences.length === 0) {
    return [];
  }
  return consequences
    .filter((c) => c.node?.impact_score !== null)
    .map((c) => ({ ...c }))
    .sort(
      (a, b) =>
        b.node.impact_score! - a.node.impact_score! || +b.node.canonical! - +a.node.canonical!,
    );
};
type SymbolToConsequences = {
  [key: string]: IArrangerEdge<IConsequenceEntity>[];
};

export const generateConsequencesDataLines = (
  rawConsequences: IArrangerEdge<IConsequenceEntity>[] | null,
): IArrangerEdge<IConsequenceEntity>[] => {
  if (!rawConsequences || rawConsequences.length === 0) {
    return [];
  }

  const ensemblTranscriptIdToConsequences: SymbolToConsequences =
    rawConsequences.reduce<SymbolToConsequences>(
      (dict: SymbolToConsequences, consequence: IArrangerEdge<IConsequenceEntity>) => {
        const keyForCurrentConsequence = consequence.node?.ensembl_transcript_id || keyNoSymbol;
        const oldConsequences = dict[keyForCurrentConsequence] || [];
        return {
          ...dict,
          [keyForCurrentConsequence]: [...oldConsequences, { ...consequence }],
        };
      },
      {},
    );

  return Object.entries(ensemblTranscriptIdToConsequences).reduce(
    (acc: IArrangerEdge<IConsequenceEntity>[], [key, consequences]) => {
      // no gene then show
      if (key === keyNoSymbol) {
        return [...acc, ...consequences];
      }

      const highestRanked = filterThanSortConsequencesByImpact(consequences)[0] || {};
      return [...acc, { ...highestRanked }];
    },
    [],
  );
};
