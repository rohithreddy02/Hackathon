import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="127.0.0.1",user="root",passwd="Srujan@1409",database="logindetails")
cursr=db_connect.cursor()
username=str(sys.argv[1])
password=str(sys.argv[2])
# username="djb"
# password="hdcg"
try:
    #execute sql command
    command='select password,count(*) from logindata where username="'+username+'";'
    cursr.execute(command)
    passwd,count=cursr.fetchone()
    if count>0:
        command='select admin from logindata where username="'+username+'";'
        cursr.execute(command) 
        admin=cursr.fetchone()[0]
        if admin=="Yes":
            if password==passwd:
                print("True-Admin")
            else:
                print("False-Admin")
        elif admin=="No":
            if password==passwd:
                print("True-Student")
            else:
                print("False-Student")
    else:
        print(False)
        
except:
    db_connect.rollback()
db_connect.close()
