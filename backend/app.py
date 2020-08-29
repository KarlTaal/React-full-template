from flask import Flask
from db_connector import get_data, post_data
from flask_cors import CORS
from flask import request

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

@app.route('/')
def hello():
    return "Hello World!"


@app.route('/getAll')
def get_all():
    return {"rows": get_data()}


@app.route('/post', methods=['POST'])
def post():
    data = request.json
    try:
        post_data(data['value'])
        return "Query executed", 200
    except:
        return "Query not executed", 400


if __name__ == '__main__':
    app.run()
