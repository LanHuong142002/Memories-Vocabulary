// Interfaces
import { Vocabulary } from '@interfaces';

// Helpers
import { orderItemNestedArray } from '@helpers';

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
}) => (
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

export default TableVocabularyBody;
