import React from 'react';

function NoticiaItem({ noticia, mostrarNoticia, editarNoticia, deletarNoticia }) {
  return (
    <li className='noticias-list'>
      <h2 className='titulo-noticias'>{noticia.titulo}</h2>
      <button className='botao' onClick={() => mostrarNoticia(noticia._id)}>Ver notícia</button>
      <button className='botao' onClick={() => editarNoticia(noticia._id)}>Editar</button>
      <button className='botao' onClick={() => deletarNoticia(noticia._id)}>Deletar</button>
    </li>
  );
}

export default NoticiaItem;