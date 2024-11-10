from flask import Flask, request, jsonify
import jwt
import mysql.connector
import datetime
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = "7fc781a3fe4bda1f1db20373d4c5bed64b27c8e8913e63fc8949a1dbe5ecbd5"

conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "123456",
    database = "employee"
)

cur = conn.cursor(dictionary=True)

@app.route('/login', methods = ['Post'])
def login():
    data = request.get_json()
    sql = "select count(*) from emplyee_details where empid = %s and password = sha(%s);"
    values = (data.get('empid'), data.get('password'))

    try:
        cur.execute(sql,values)
        resp = cur.fetchall()
        if(resp[0]['count(*)']==1):
            jwt = jwtgen(data.get('empid'))
            return jsonify({"jwt":jwt})
        else :
            return jsonify({"status":"login failed"})
    except:
        return "login failed"

@app.route('/userdata', methods = ['get'])
def getdata():
    token = request.headers.get('token')

    if not token:
        return "Unautherized"

    tokendecode = getempid(token)
    empid = tokendecode['user']   

    sql = "SELECT emplyee_details.*, employee_updates.* FROM emplyee_details, employee_updates WHERE emplyee_details.empid = employee_updates.empid AND emplyee_details.empid = %s order by date desc;"
    values = (empid,)

    cur.execute(sql,values)

    return (cur.fetchall())



    token = request.headers.get('token')

    if not token:
        return "Unautherized"

    tokendecode = getempid(token)
    empid = tokendecode['user']   

    sql = "SELECT * FROM employee_updates WHERE empid = %s order by date desc;"
    values = (empid,)

    cur.execute(sql,values)

    return (cur.fetchall())

@app.route('/empupdate', methods = ['POST'])
def updateemp():
    
    token = request.headers.get('token')

    if not token:
       return "Unautherized"

    tokendecode = getempid(token)
    empid = tokendecode['user']   

    data = request.get_json()
    sql = 'insert into employee_updates values(%s,%s,%s,%s,%s,2);'
    values = (empid,data.get('date'),data.get('subject'),data.get('details'),data.get('attachment'))
    cur.execute(sql,values)
    conn.commit()
    return "Success"
    # except:
    #     return "Failed"

@app.route('/myteam', methods = ['get'])
def getteam():
    token = request.headers.get('token')

    if not token:
       return "Unautherized"

    tokendecode = getempid(token)
    empid = tokendecode['user']

    sql = "SELECT emplyee_details.*, employee_updates.* FROM emplyee_details, employee_updates WHERE emplyee_details.empid = employee_updates.empid AND emplyee_details.team_lead = %s and date = curdate();"
    values = (empid,)

    cur.execute(sql,values)

    return (cur.fetchall())





# jwt part 
def jwtgen(empid):
    return jwt.encode({'user': empid,'exp' : datetime.datetime.utcnow() 
    + datetime.timedelta(minutes=30)}, 
    app.config['SECRET_KEY'], algorithm="HS256")

def getempid(token):
    return jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

if __name__ == '__main__':
    app.run(debug=True)

