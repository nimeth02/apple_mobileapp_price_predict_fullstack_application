from flask import Flask,request,jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from auth_middleware import token_required
import json
import jwt, os
import util


app=Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
bcrypt = Bcrypt(app)
app.config['MONGODB_SETTINGS'] = {
    'db': 'predictit',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine()
db.init_app(app)

SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'

app.config['SECRET_KEY'] = SECRET_KEY


class User(db.Document):
    email = db.StringField()
    password=db.StringField()
    name=db.StringField()
    token=db.StringField()
    def to_json(self):
        return {
                "name":self.name,
                "email": self.email,
                "password":self.password,
                "token":self.token
                }



@app.route('/user/signin', methods=['POST'])
def signin():
    
    data = request.get_json()
    # token_required(request)
    user = User.objects(email=data['email']).first()
    # user=user.to_json()
    if not user:
        return make_response(jsonify({'error': 'user not found'}), 401) 
    else:
        user=user.to_json()
        is_valid =bcrypt.check_password_hash(user['password'],data['password']) 
        
        if (is_valid):
            user["token"] = jwt.encode(
                    {"name": user["name"],"email": user["email"]},
                    "SECRET_KEY",
                    algorithm="HS256"
                )
            # print(user)
            return make_response(jsonify(user), 200)
        else:
            return make_response(jsonify({'error': 'password not correct'}), 401)     
        

@app.route('/user/signup', methods=['POST'])
def signup():
    try:
        # Get data from the request's JSON body
        data = request.get_json()
        user = User.objects(email=data['email']).first()
        # user=user.to_json()
        if  user:
          
            return   make_response(jsonify({'error': 'user already exist'}), 500)
        else:
            
            # Create a new user document
            data['password'] = bcrypt.generate_password_hash(data['password'])
            user = User(**data)
            user.save()  # Save the user to the database

            return make_response(jsonify({'message': 'User created successfully'}), 201) 
    except Exception as e:
        return jsonify({'error': str(e)})


  
    


@app.route('/predictit',methods=['POST'])
@cross_origin()
def predictit():
    # print('data',request.data)
    # auth=token_required(request)
    # if(auth):
    response = jsonify({
        'price': util.predictit(request.data)
    })
    # else:
    #      response = jsonify({
    #     'error': 'user not autherized'
    # })    
    return response;

@app.route('/predictit/Without_Location',methods=['POST'])
# @cross_origin()
def predictit_Without_Location():
    print('data-no location',request.data)
    # auth=token_required(request)
    # if(auth):
    response = jsonify({
        'price': util.predictit_Without_Location(request.data)
    })
    # else:
    #      response = jsonify({
    #     'error': 'user not autherized'
    # })    
    return response;



if __name__ == "__main__":
    print("starting python flask server")
    app.run(debug=True, port=5000)    