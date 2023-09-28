import { useCallback } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { TableRowLoading, TableRowVocabulary } from '@components';

const TableVocabularyBody = ({
  isAdding,
  isLoadingMore,
  deletingById,
  vocabularies,
  onClick,
}: {
  isAdding: boolean;
  isLoadingMore: boolean;
  deletingById: {
    [id: string]: boolean;
  };
  vocabularies: Vocabulary[][];
  onClick: (id: string) => void;
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
              isLoading={deletingById[id]}
              key={`table-vocabulary-${id}`}
              id={id}
              order={orderItemNestedArray(index, indexNested)}
              english={english}
              vietnamese={vietnamese}
              onClick={onClick}
            />
          ))}
          {(isAdding || isLoadingMore) && <TableRowLoading />}
        </div>
      ))}
    </div>
  );
};

export default TableVocabularyBody;
