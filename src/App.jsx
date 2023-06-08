import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editandoNoticia, setEditandoNoticia] = useState(null);

  useEffect(() => {
    buscarNoticias();
  }, []);

  const buscarNoticias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/noticias');
      setNoticias(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const criarNoticia = async (e) => {
    e.preventDefault();
    try {
      if (editandoNoticia) {
        await axios.put(`http://localhost:5000/noticias/${editandoNoticia}`, {
          titulo,
          conteudo,
          data_publicacao: new Date().toISOString(),
        });
        setEditandoNoticia(null);
      } else {
        await axios.post('http://localhost:5000/noticias', {
          titulo,
          conteudo,
          data_publicacao: new Date().toISOString(),
        });
      }
      setTitulo('');
      setConteudo('');
      buscarNoticias();
    } catch (error) {
      console.error(error);
    }
  };

  const editarNoticia = async (noticiaId) => {
    try {
      const response = await axios.get(`http://localhost:5000/noticias/${noticiaId}`);
      const { titulo, conteudo } = response.data;
      setTitulo(titulo);
      setConteudo(conteudo);
      setEditandoNoticia(noticiaId);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='container'>
      <h1>Notícias</h1>
      <form onSubmit={criarNoticia}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Conteúdo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        ></textarea>
        <button type="submit">Publicar</button>
      </form>
      <ul>
        {noticias.map((noticia) => (
          <li key={noticia._id} className='noticias-list'>
            <h2>{noticia.titulo}</h2>
            <p>{noticia.conteudo}</p>
            <p>{noticia.data_publicacao}</p>
            <button onClick={() => editarNoticia(noticia._id)}>Editar</button>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default App;