import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="127.0.0.1",user="root",passwd="Srujan@1409",database="logindetails")
cursr=db_connect.cursor()
username=str(sys.argv[1])
password=str(sys.argv[2])
try:
    count=cursr.execute('select * from logindata where username="'+username+'";')
    if count==0:
        command='insert into logindata values("'+username+'","'+password+'");'
        cursr.execute(command)
        db_connect.commit()
        print("Account Created")
    else:
        print("User Exist")
except:
    db_connect.rollback()
db_connect.close()