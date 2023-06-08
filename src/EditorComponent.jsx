import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

function EditorComponent({ conteudo, setConteudo }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    setConteudo(contentState.getPlainText());
  };

  const handleBoldClick = () => {
    const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    handleEditorChange(newState);
  };

  return (
    <div>
      <button onClick={handleBoldClick}>Bold</button>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder="Conteúdo"
      />
    </div>
  );
}

export default EditorComponent;
