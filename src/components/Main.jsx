import React from 'react';
import './Main.css';
import Markdown from 'react-markdown';
import { Heading } from '@chakra-ui/react';

const Main = ({ activeNote, onUpdateNote }) => {
  //編集されるノートの情報
  const onEditContent = (key, value) => {
    onUpdateNote({
      ...activeNote,
      id: activeNote.id,
      [key]: value,
      modDate: Date.now(),
    });
  };

  //ノートが選択されていない場合の表示
  if (!activeNote) {
    return (
      <div className="no-active-note">
        <p>ノートが選択されていません。</p>
      </div>
    );
  }

  //ノートを表示
  return (
    <div className="app-main">
      <div className="main-note-edit">
        <input
          id="title"
          type="text"
          placeholder="見出しを記入"
          value={activeNote.title}
          onChange={(e) => onEditContent('title', e.target.value)}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          value={activeNote?.content}
          onChange={(e) => onEditContent('content', e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <Heading as="h2" size="lg" className="preview-title">
          ノートプレビュー
        </Heading>
        <Heading as="h3" size="md" className="preview-title">
          {activeNote.title}
        </Heading>
        <Markdown className="markdown-preview">{activeNote.content}</Markdown>
      </div>
    </div>
  );
};

export default Main;
