import { notesList } from '../data/notes';
import { Note } from '../models/note.model';

export class NotesRepository {
  public list(email: string) {
    return notesList.filter((notes) => notes.user.email === email);
  }

  public create(note: Note) {
    notesList.push(note);
  }

  public findIndex(id: string) {
    return notesList.findIndex((note) => note.id === id);
  }

  public getNote(id: string) {
    return notesList.find((note) => note.id === id);
  }

  public delete(index: number) {
    notesList.splice(index, 1);
  }
}
