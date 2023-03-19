import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
username=str(sys.argv[1])
email=str(sys.argv[2])
password=str(sys.argv[3])
if str(sys.argv[4]==1):
    admin="Yes"
else:
    admin="No"
try:
    cursr.execute('select count(username) from logindetails where username="'+username+'";')
    count=cursr.fetchone()[0]
    if count==0:
        command='insert into logindetails(username,password,admin) values("'+username+'","'+password+'","'+admin+'");'
        cursr.execute(command)
        db_connect.commit()
        print("Account Created")
        sys.stdout.flush()
    else:
        print("User Exist")
        sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()