import pymysql
import sys


#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
username=sys.argv[1]



try:
    command='select Name from Studentdetails where Rollno="'+username+'";'
    cursr.execute(command)
    Name=cursr.fetchone()[0]
    print(Name)
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()