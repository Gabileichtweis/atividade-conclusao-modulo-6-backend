import { notesList } from '../data/notes';
import { Note } from '../models/note.model';

export class NotesRepository {
  public create(note: Note) {
    notesList.push(note);
  }
}
