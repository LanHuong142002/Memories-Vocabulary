import { Vocabulary } from './vocabulary';

export interface VocabularyResult extends Vocabulary {
  isSuccess?: boolean;
  answer?: string;
}
