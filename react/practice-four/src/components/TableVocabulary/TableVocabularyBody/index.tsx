// Interfaces
import { Vocabulary } from '@interfaces';

// Helpers
import { orderItemNestedArray } from '@helpers';

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
}) => (
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

export default TableVocabularyBody;
