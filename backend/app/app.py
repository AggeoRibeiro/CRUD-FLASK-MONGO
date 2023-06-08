from flask import Flask
from flask_cors import CORS


from routes import criar_noticia_bp, obter_noticias_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(criar_noticia_bp)
app.register_blueprint(obter_noticias_bp)

if __name__ == '__main__':
    app.run(debug=True)
