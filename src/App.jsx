import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );

  const [activeNote, setActiveNote] = useState(null);

  //ローカルストレージにノートを保存する
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  //選択しているノートをメイン側で表示
  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0].id);
    }
  }, [notes]);

  //追加されるノートの初期表示
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: '新しいノート',
      content: '新しいノートの内容',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  //該当のノートを削除
  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  //アクティブなノートを取得
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote) || null;
  };

  //ノートの編集
  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotesArray);
  };

  //サイドバーとメインを表示
  return (
    <>
      <div className="App">
        <Sidebar
          onAddNote={onAddNote}
          notes={notes}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </>
  );
}

export default App;
