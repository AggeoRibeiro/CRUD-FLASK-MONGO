import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'draft-js/dist/Draft.css';
import NoticiaItem from './NoticiaItem';
import EditorComponent from './EditorComponent';



function HomePage() {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editandoNoticia, setEditandoNoticia] = useState(null);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);

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

  const deletarNoticia = async (noticiaId) => {
    try {
      await axios.delete(`http://localhost:5000/noticias/${noticiaId}`);
      buscarNoticias();
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarNoticia = (noticiaId) => {
    const noticia = noticias.find((noticia) => noticia._id === noticiaId);
    setNoticiaSelecionada(noticia);
  };



  return (
    <div className='container'>
      <h1>Notícias</h1>
      <form className='formulario_titulo' onSubmit={criarNoticia}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <EditorComponent
          conteudo={conteudo}
          setConteudo={setConteudo}
        />
        <button type="submit">Publicar</button>
      </form>
      <ul>
        {noticias.map((noticia) => (
          <NoticiaItem
            key={noticia._id}
            noticia={noticia}
            mostrarNoticia={mostrarNoticia}
            editarNoticia={editarNoticia}
            deletarNoticia={deletarNoticia}
          />
        ))}
      </ul>
      {noticiaSelecionada && (
        <div className="noticia-selecionada">
          <h2>{noticiaSelecionada.titulo}</h2>
          <div dangerouslySetInnerHTML={{ __html: noticiaSelecionada.conteudo }}></div>
          <p>{noticiaSelecionada.data_publicacao}</p>
          <button onClick={() => setNoticiaSelecionada(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;