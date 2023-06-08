import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/noticias', { title, content });
      console.log(response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar Notícia</h2>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Conteúdo:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
