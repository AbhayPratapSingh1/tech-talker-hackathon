from flask_socketio import SocketIO, emit, rooms
import jwt
import datetime


###### for mails ######
# import os
import smtplib
from email.mime.text import MIMEText


import jwt as pyJWT

from flask import Flask, request, jsonify, make_response
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
import json
from flask_sqlalchemy import SQLAlchemy

from functools import wraps
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, create_refresh_token, get_jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from datetime import timedelta

from matplotlib.style import available
from sqlalchemy import text
import datetime

from sympy import limit
app = Flask(__name__)
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/emoji_db?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 10  
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 30  
app.config['SQLALCHEMY_POOL_RECYCLE'] = 280 
app.config['SQLALCHEMY_MAX_OVERFLOW'] = 5
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, supports_credentials=True)


active_Users = {}

def userExist(user, password):
    querry = text("SELECT 1 FROM users WHERE id = :user and password = :password LIMIT 1")
    result = db.session.execute(querry, {'user': user,"password":password})

    if not result.fetchone():
        return False, (jsonify({"error":"User Doesn't Exist"}), 401)
    return True,True

def create_token(userId):
    payload = {
        'userId': userId,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Use timezone-aware datetime
    }
    token = pyJWT.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

def verify_token(token):
    try:
        decoded = pyJWT.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return decoded, True
    except pyJWT.ExpiredSignatureError:
        return "Token has expired", False
    except pyJWT.InvalidTokenError:
        return "Invalid token", False



def getData():
    try:
        raw = request.get_data()
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return False, (jsonify({"error": "Invalid JSON"}), 400)
    except:
        try:
            data = request.get_json()
        except:
            return False, (jsonify({"error":"server response fail"}),400)
    return True, data

def haveRequiredData(data, *items, accurate = False):
    props = data.keys()
    for i in items:
        if not i in props:
            return False
    if accurate and len(items) != len(props):
        return False
    return True


def getFriendsData(id):
    query = text("select id2 from friend where id1 = :id ")
    result = db.session.execute(query, {'id': id}).fetchall()

@app.route("/")
def check():
    return jsonify({"data":"end point is working properly"})


@app.route("/sign-in",methods=["POST","OPTIONS"])
def sign_in_request():
    if request.method == 'OPTIONS':
        return '', 204
    
    valid, data = getData()
    
    if not valid :
        return data
    
    if not haveRequiredData(data, "name","password","phoneNo","email",accurate = True) :
        return jsonify({"error":"Required Data's Items Not exact match!"}),400
    
    exist, message = userExist(data['email'],data['password'])
    if exist:    
        return jsonify({"error":"user Exist"}),401
    try:
        query = text("INSERT INTO users (name, password, id , phoneNumber) VALUES (:name, :password, :email, :phoneNo)")
        db.session.execute(query, {'name': data["name"],'password': data["password"],'email': data["email"],'phoneNo': data["phoneNo"]})
        db.session.commit()
        return jsonify({"data":"done"}),200

    except Exception as e:
        return jsonify({"error":"Internal Server Error"}),500

@app.route("/log-in",methods=["POST","OPTIONS"])
def log_in_request():
    if request.method == 'OPTIONS':
        return '', 204
    
    valid, data = getData()
    
    if not valid :
        return data
    
    if not haveRequiredData(data, "id","pwd",accurate = True) :
        return jsonify({"error":"Required Data's Items Not exact match!"}),400
    
    exist, message = userExist(data['id'],data['pwd'])
    if not exist:    
        return message
    try:
        query = text("select id, password, phoneNumber,name  from users where id = :id and password = :password")
        result = db.session.execute(query, {'id': data["id"],'password': data["pwd"]}).fetchall()
        if len(result) == 0 :
            return ({"error":"User Doesn't Exits"}),401
        
        token = create_token(data['id'])
        
        data = {
            "name":result[0][3],
            "id":result[0][0],
            "phNo":result[0][2]
        }
        return jsonify({"data":data,"token":token}),200

    except Exception as e:
        return jsonify({"error":"Internal Server Error"}),500

@app.route("/find-friend",methods=["POST","OPTIONS"])
def findFriend():
    if request.method == 'OPTIONS':
        return '', 204
    token = request.headers.get('Authorization')
    if token:
        token = token.replace('Bearer ', '')  # Removes 'Bearer ' prefix if it exists
    else:
        return jsonify({"error": "No token provided"}), 401
    
    valid, data = getData()
    
    if not valid :
        return data
    
    if not haveRequiredData(data,"id",accurate = True) :
        return jsonify({"error":"Required Data's Items Not exact match!"}),400
    
    userData,valid = verify_token(token)
    if not valid:
        return jsonify({"error":"no token found"}),401
    try:
        id = userData['userId']
        query = text("select id, password, phoneNumber,name  from users where id = :id ")
        result = db.session.execute(query, {'id': data['id']}).fetchall()
        
        if len(result) >0 :
            data = {
                "name": result[0][3],
                "id": result[0][0],
                "phNo": result[0][2],
            }
            return jsonify({"find":1,"data":data}),200
        else :
            return jsonify({"find":0}),200

    except Exception as e:
        return jsonify({"error":"Internal Server Error"}),500

@app.route("/add-friend",methods=["POST","OPTIONS"])
def addFriend():
    if request.method == 'OPTIONS':
        return '', 204
        
    valid, data = getData()
    
    if not valid :
        return data
    
    if not haveRequiredData(data,"id","fid",accurate = True) :
        return jsonify({"error":"Required Data's Items Not exact match!"}),400
    
    try:
        id,fid = data['id'] ,data['fid']
        query = text("select id1,id2 from friend where (id1 = :id1 and id2 = :id2) or (id1 = :id2 and id2 = :id1) ")
        result = db.session.execute(query, {'id1': id, "id2":fid}).fetchall()
        if len(result) != 0:
            return jsonify({"error":"exist"}),200
        query = text("insert into friend(id1, id2) values(:id1, :id2) ")
        db.session.execute(query, {'id1': id, "id2":fid})
        db.session.commit()
        print()
        return jsonify({"done":"done"}),200

    except Exception as e:
        return jsonify({"error":"Internal Server Error"}),500



@app.route("/set-seen-all",methods=["POST","OPTIONS"])
def set_seen_all():
    if request.method == 'OPTIONS':
        return '', 204
    
    token = request.headers.get('Authorization')
    if token:
        token = token.replace('Bearer ', '')  # Removes 'Bearer ' prefix if it exists
    else:
        return jsonify({"error": "No token provided"}), 401
    valid, data = getData()
    
    if not valid :
        return data
    
    if not haveRequiredData(data,"receiverId",accurate = True) :
        return jsonify({"error":"Required Data's Items Not exact match!"}),400
    
    exist, message = userExist(data['senderId'])
    if not exist:    
        return message
    userData,valid = verify_token(token)
    if not valid:
        return jsonify({"error":"no token found"}),401
    try:
        id = userData['userId']
        query = text("update chats set receiveTime = Current_timestamp where senderId = :id and receiverId = :resId")
        db.session.execute(query, {'id': id,'resId': data['receiverId']})
        db.session.commit()
        return jsonify({"data":"done"}),200

    except:
        return jsonify({"error":"Internal Server Error"}),500

def getAllData(id):
    query = text("SELECT id1, id2 FROM friend WHERE id1 = :id OR id2 = :id")
    result = db.session.execute(query, {'id': id}).fetchall()
    userQuery = text("SELECT id, phoneNumber, name FROM users WHERE id = :id")
    chatQuery = text(
        "SELECT message, senderId, receiverId, sendTime FROM chats "
        "WHERE (senderId = :id AND receiverId = :id2) OR (senderId = :id2 AND receiverId = :id) "
        "ORDER BY sendTime ASC"
    )

    data = []
    for each in result:
        friend = each[0] if str(each[0]) != str(id) else each[1]
        friendData = db.session.execute(userQuery, {"id": friend}).fetchone()
        chatsData = db.session.execute(chatQuery, {"id": id, "id2": friend}).fetchall()
        messages=[]
        for every in chatsData:
            messages.append(
                {
                    "message": every[0],
                    "type": "send" if every[1] == id else "receive",
                    "time": int(every[3].timestamp())*1000
                }
            )

        try: 
            data.append({"id": friendData[0], "name": friendData[2], "phNo": friendData[1], "message": messages})
        except:
            pass
    return data
    

@socketio.on('connect')
def handle_connect():
    try:
        userId = request.args.get('userId')
        if not userId:
            emit('message', {"error": "UserId is missing"})
            return

        active_Users[userId] = request.sid
        
        data = getAllData(userId)
        
        emit('message', {'data': data, 'type':'users'})

    except Exception as e:
        print(f"Error: {e}")


@socketio.on('message')
def handle_message(data):
    try:
        type = data['type']
        mainId = data['id']
        if (type == "messageSend"):
            query = text("INSERT INTO chats (message, senderId, receiverId) VALUES (:mess, :sendId, :revId)")
            db.session.execute(query, {'mess': data["data"]['message'], 'sendId': data['data']["senderId"], "revId": data["data"]["receiverId"]})
            db.session.commit()
            
        if type == "addFriend":
            id = data['data']['id']
            query = text("select id from users where id = :id ")
            result = db.session.execute(query, {'id': id}).fetchall()
            if len(result) != 0:
                query = text("select id1,id2 from friend where (id1 = :id1 and id2 = :id2) or (id1 = :id2 and id2 = :id1) ")
                result = db.session.execute(query, {'id1': id, "id2":data['data']['fid']}).fetchall()
                if len(result) == 0:
                    query = text("insert into friend(id1, id2) values(:id1, :id2) ")
                    db.session.execute(query, {'id1': id, "id2":data['data']['fid']})
                    db.session.commit()
                    
        data = getAllData(mainId)
        emit('message', {'data': data, 'type':'users'})

    except Exception as e:
        print(f"Error: {e}")

@socketio.on('disconnect')
def on_disconnect():
    # When the user disconnects, remove them from active_users
    for userid, sid in active_Users.items():
        if sid == request.sid:
            del active_Users[userid]
            break
    emit('message', {'data': 'You have disconnected.'})

 

if __name__ == '__main__':
    socketio.run(app, debug=True)
