import { Vocabulary } from '@interfaces';

export interface Topic {
  id?: string;
  name: string;
  vocabularies?: Vocabulary[];
}
