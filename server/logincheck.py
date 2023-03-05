import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="127.0.0.1",user="root",passwd="Srujan@1409",database="logindetails")
cursr=db_connect.cursor()
username=str(sys.argv[1])
password=str(sys.argv[2])
try:
    #execute sql command
    command='select password,count(*) from logindata where username="'+username+'";'
    cursr.execute(command)
    passwd,count=cursr.fetchone()
    if count>0:
        if password==passwd:
            print("Account Verified!!!")
        else:
            print("Wrong Password!!!!")
    else:
        print("User not Found or Incorrect Username!!!!")
        
except:
    db_connect.rollback()
db_connect.close()
