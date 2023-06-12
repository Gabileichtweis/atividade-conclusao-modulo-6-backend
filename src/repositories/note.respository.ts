import { Note } from '../models/note.model';

interface ListNotesParams {
  userEmail: string;
  notes: Note[];
}
