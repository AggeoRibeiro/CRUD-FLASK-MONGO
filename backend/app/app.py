from flask import Flask
from flask_cors import CORS


from routes import criar_noticia_bp, obter_noticias_bp


app = Flask(__name__)

app.register_blueprint(criar_noticia_bp)
app.register_blueprint(obter_noticias_bp)


CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
    app.run(debug=True)
