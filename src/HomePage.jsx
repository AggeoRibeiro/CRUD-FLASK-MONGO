import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'draft-js/dist/Draft.css';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';



function HomePage() {
    const [noticias, setNoticias] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [editandoNoticia, setEditandoNoticia] = useState(null);
    const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleBoldClick = () => {
        const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        handleEditorChange(newState);
    };



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
                <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    placeholder="Conteúdo"
                />
                <div>
                    <button onClick={handleBoldClick}>Bold</button>
                    <Editor editorState={editorState} onChange={handleEditorChange} />
                </div>

                <button type="submit">Publicar</button>
            </form>
            <ul>
                {noticias.map((noticia) => (
                    <li key={noticia._id} className='noticias-list'>
                        <h2>{noticia.titulo}</h2>


                        <button onClick={() => mostrarNoticia(noticia._id)}>Ver notícia</button>
                        <button onClick={() => editarNoticia(noticia._id)}>Editar</button>
                        <button onClick={() => deletarNoticia(noticia._id)}>Deletar</button>
                    </li>
                ))}
            </ul>
            {noticiaSelecionada && (
                <div className="noticia-selecionada">
                    <h2>{noticiaSelecionada.titulo}</h2>
                    <div dangerouslySetInnerHTML={{ __html: stateToHTML(noticiaSelecionada.conteudo) }}></div>
                    <p>{noticiaSelecionada.data_publicacao}</p>
                    <button onClick={() => setNoticiaSelecionada(null)}>Fechar</button>
                </div>

            )}
        </div>
    );
}

export default HomePage;
