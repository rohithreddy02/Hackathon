import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
try:
    command='select count(S11B) from Studentdetails where S11B!=0;'
    cursr.execute(command)
    s1b=cursr.fetchone()[0]
    command='select count(S12B) from Studentdetails where S12B!=0;'
    cursr.execute(command)
    s2b=cursr.fetchone()[0]
    command='select count(S21B) from Studentdetails where S21B!=0;'
    cursr.execute(command)
    s3b=cursr.fetchone()[0]
    command='select count(S22B) from Studentdetails where S22B!=0;'
    cursr.execute(command)
    s4b=cursr.fetchone()[0]
    print(s1b,s2b,s3b,s4b)
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()