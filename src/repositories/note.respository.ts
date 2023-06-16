import { notesList } from '../data/notes';
import { Note, NoteType } from '../models/note.model';

interface ListNotesProps {
  email: string;
  type?: NoteType;
}

export class NotesRepository {
  public list(props: ListNotesProps) {
    return notesList.filter(
      (note) =>
        note.user.email === props.email &&
        (!props.type || note.type === props.type)
    );
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
