from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = "mongodb+srv://admin:admin@cluster0.dpbxfet.mongodb.net/?retryWrites=true&w=majority"

criar_noticia_bp = Blueprint('criar_noticia_bp', __name__)
obter_noticias_bp = Blueprint('obter_noticias_bp', __name__)

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
db = client['noticiasdb']
noticias_collection = db['noticias']

@criar_noticia_bp.route('/noticias', methods=['POST'])
def criar_noticia():
    data_atual = datetime.now().date().isoformat()
    titulo = request.json['titulo']
    conteudo = request.json['conteudo']
    data_publicacao = data_atual

    noticia = {
        'titulo': titulo,
        'conteudo': conteudo,
        'data_publicacao': data_publicacao
    }

    result = noticias_collection.insert_one(noticia)
    noticia['_id'] = str(result.inserted_id)

    return jsonify(noticia), 201

@obter_noticias_bp.route('/noticias', methods=['GET'])
def obter_noticias():
    noticias = list(noticias_collection.find())
    for noticia in noticias:
        noticia['_id'] = str(noticia['_id'])

    return jsonify(noticias)

@obter_noticias_bp.route('/noticias/<noticia_id>', methods=['GET'])
def obter_noticia(noticia_id):
    noticia = noticias_collection.find_one({'_id': ObjectId(noticia_id)})
    noticia['_id'] = str(noticia['_id'])

    return jsonify(noticia)

@obter_noticias_bp.route('/noticias/<noticia_id>', methods=['PUT'])
def atualizar_noticia(noticia_id):
    titulo = request.json['titulo']
    conteudo = request.json['conteudo']
    data_publicacao = request.json['data_publicacao']

    result = noticias_collection.update_one(
        {'_id': ObjectId(noticia_id)},
        {'$set': {'titulo': titulo, 'conteudo': conteudo, 'data_publicacao': data_publicacao}}
    )

    if result.matched_count == 0:
        return jsonify({'message': 'Notícia não encontrada.'}), 404

    noticia = noticias_collection.find_one({'_id': ObjectId(noticia_id)})
    noticia['_id'] = str(noticia['_id'])

    return jsonify(noticia)

@obter_noticias_bp.route('/noticias/<noticia_id>', methods=['DELETE'])
def excluir_noticia(noticia_id):
    result = noticias_collection.delete_one({'_id': ObjectId(noticia_id)})

    if result.deleted_count == 0:
        return jsonify({'message': 'Notícia não encontrada.'}), 404

    return '', 204
