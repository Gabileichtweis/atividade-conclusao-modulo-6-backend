import { notesList } from '../data/notes';
import { Note } from '../models/note.model';

export class NotesRepository {
  public create(note: Note) {
    notesList.push(note);
  }

  public findIndex(id: string) {
    return notesList.findIndex((note) => note.id === id);
  }

  public delete(index: number) {
    return notesList.splice(index, 1);
  }
}
