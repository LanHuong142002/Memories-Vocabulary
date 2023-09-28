import { useCallback } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { TableRowLoading, TableRowVocabulary } from '@components';

const TableVocabularyBody = ({
  isAdding,
  isLoadingMore,
  topicId,
  vocabularies,
}: {
  isAdding: boolean;
  isLoadingMore: boolean;
  topicId: string;
  vocabularies: Vocabulary[][];
}) => {
  const orderItemNestedArray = useCallback((index: number, indexNested: number) => {
    return index === 0 ? indexNested + 1 : (index + 1) * 10 + indexNested + 1;
  }, []);

  return (
    <div>
      {vocabularies.map((item, index) => (
        <div key={`table-vocabulary-row${index}`}>
          {item.map(({ id, english, vietnamese }, indexNested) => (
            <TableRowVocabulary
              topicId={topicId}
              key={`table-vocabulary-${id}`}
              id={id}
              order={orderItemNestedArray(index, indexNested)}
              english={english}
              vietnamese={vietnamese}
            />
          ))}
          {(isAdding || isLoadingMore) && <TableRowLoading />}
        </div>
      ))}
    </div>
  );
};

export default TableVocabularyBody;
