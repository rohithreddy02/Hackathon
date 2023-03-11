import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
username=str(sys.argv[1])
password=str(sys.argv[2])
# username="djb"
# password="hdcg"
try:
    #execute sql command
    command='select password,count(*) from logindetails where username="'+username+'";'
    cursr.execute(command)
    passwd,count=cursr.fetchone()
    if count>0:
        command='select admin from logindetails where username="'+username+'";'
        cursr.execute(command) 
        admin=cursr.fetchone()[0]
        if admin=="Yes":
            if password==passwd:
                print("True-Admin")
                sys.stdout.flush()
            else:
                print("False-Admin")
                sys.stdout.flush()
        elif admin=="No":
            if password==passwd:
                print("True-Student")
                sys.stdout.flush()
            else:
                print("False-Student")
                sys.stdout.flush()
    else:
        print(False)
        sys.stdout.flush()
        
except:
    db_connect.rollback()
db_connect.close()
