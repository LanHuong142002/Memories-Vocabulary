import { Vocabulary } from '@interfaces';

export interface Topic {
  vocabularyCount?: number;
  id: string;
  name: string;
  vocabularies?: Vocabulary[];
}
