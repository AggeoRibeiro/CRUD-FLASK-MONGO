import React from 'react';

function NoticiaItem({ noticia, mostrarNoticia, editarNoticia, deletarNoticia }) {
  return (
    <li className='noticias-list'>
      <h2>{noticia.titulo}</h2>
      <button onClick={() => mostrarNoticia(noticia._id)}>Ver notícia</button>
      <button onClick={() => editarNoticia(noticia._id)}>Editar</button>
      <button onClick={() => deletarNoticia(noticia._id)}>Deletar</button>
    </li>
  );
}

export default NoticiaItem;
