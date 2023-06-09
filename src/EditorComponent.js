import React, { useState, useEffect } from 'react';

import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';


function EditorComponent({ conteudo, setConteudo }) {
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
  
    const handleEditorChange = (newEditorState) => {
      setEditorState(newEditorState);
      const contentState = newEditorState.getCurrentContent();
      const contentHTML = stateToHTML(contentState);
      setConteudo(contentHTML);
    };
  
  
    const handleBoldClick = (e) => {
      e.preventDefault();
      const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
      handleEditorChange(newState);
    };
  
    const handleUnderlineClick = (e) => {
      e.preventDefault();
      const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
      handleEditorChange(newState);
    };
  
  
    return (
      <div>
        <button type="button" onClick={handleBoldClick}>
          Negrito
        </button>
        <button type="button" onClick={handleUnderlineClick}>
          Sublinhado
        </button>
  
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder="Conteúdo"
        />
      </div>
    );
  }

  export default EditorComponent
  