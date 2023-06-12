import { Note } from '../models/note.model';
import { usersList } from './users';

export const notesList: Note[] = [
  new Note('teste', 'teste descrição', usersList[0]),
];
