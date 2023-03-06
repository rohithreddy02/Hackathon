import mysql.connector

def create_connection():
    db = mysql.connector.connect(host='localhost', user='root',
                             password='12345678', database='studentinformation', port='3360')
    return db
