from flask import Flask, request, jsonify
from db_connector import get_data, post_data, get_user, create_user
from flask_cors import CORS
from hashutils import make_pw_hash, check_pw_hash
from flask_jwt_extended import JWTManager, create_access_token, get_raw_jwt, jwt_required

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['JWT_SECRET_KEY'] = 'secret' #change this to something else. It's part of the JWT and adds security to the token.
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

jwt = JWTManager(app)
CORS(app)

blacklist = set()  # blacklisted tokens for logging out


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


""" not used right now
@app.route('/isAuthorized')
@jwt_required  # tells if it needs to be authorized or not
def is_authorized():  # Returns an error if not authorized
    print("email", get_jwt_identity()['email'])
    return "Authorized", 200
"""


@app.route('/getAll')
@jwt_required
def get_all():
    return {"rows": get_data()}


@app.route('/post', methods=['POST'])
@jwt_required
def post():
    data = request.json
    try:
        post_data(data['value'])
        return "Query executed", 200
    except:
        return "Query not executed", 400


@app.route('/logout')
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return "Logged out", 200


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = str(request.json['email'])
        password = str(request.json['password'])
        user = get_user(email)
        if len(user) == 1 and check_pw_hash(password, user[0][2]):
            # Token expires in time, ~15mins
            access_token = create_access_token(identity={'email': user[0][1], 'password': user[0][2]})
            return jsonify(access_token=access_token, ident=email), 200
        else:
            if len(user) == 0:
                return "No such account", 401
            elif not check_pw_hash(password, user[0][2]):
                return "Wrong password", 401
            else:
                return "Something went terribly wrong!", 400  # should not reach here


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        email = str(request.json['email'])
        password = str(request.json['password'])
        verify = str(request.json['verify'])

        if password != verify:
            return "Passwords do not match", 401

        user = get_user(email)
        if len(user) != 0:
            return "Account with this email already exists", 409

        try:
            create_user(email, make_pw_hash(password))
            return "Account added successfully", 200
        except:
            return "Something went wrong, account not added", 400


if __name__ == '__main__':
    app.run()
