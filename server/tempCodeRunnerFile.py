import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
try:
    command='select count(username) from logindetails where admin="No";'
    studentcount=cursr.execute(command)
    studentcount=cursr.fetchone()[0]
    command='select count(username) from logindetails where admin="Yes";'
    cursr.execute(command)
    admincount=cursr.fetchone()[0]
    print(studentcount,admincount)
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()