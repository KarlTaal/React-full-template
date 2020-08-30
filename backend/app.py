from flask import Flask
from db_connector import get_data, post_data, get_user, create_user
from flask_cors import CORS
from flask import request
from hashutils import make_pw_hash, check_pw_hash

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)
app.secret_key = "dgs432b3ejbge4"


@app.before_request
def require_login():
    allowed_routes = ['login', 'register', 'hello']
    if request.endpoint not in allowed_routes and False: #TODO check if user is logged in
        return "Login required", 500

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

@app.route('/logout')
def logout():
    # TODO unremember the user
    return "Logged out", 200

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = str(request.json['email'])
        password = str(request.json['password'])
        user = get_user(email)
        if len(user) == 1 and check_pw_hash(password, user[0][2]):
            # TODO remember the user
            return "Login successful", 200
        else:
            if len(user) == 0:
                return "No such account", 400
            elif check_pw_hash(password, user[0][2]):
                return "Wrong password", 400
            else:
                return "Something went terribly wrong!", 400 #should not reach here

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        email = str(request.json['email'])
        password = str(request.json['password'])
        verify = str(request.json['verify'])

        if password != verify:
            return "Passwords do not match", 400

        user = get_user(email)
        if len(user) != 0:
            return "Account with this email already exists", 400

        try:
            create_user(email, make_pw_hash(password))
            return "Account added successfully", 200
        except:
            return "Something went wrong, account not added", 400


if __name__ == '__main__':
    app.run()
