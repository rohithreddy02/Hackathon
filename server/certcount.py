import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
try:
    command='select count(*) from dheemanthdb1.Studentdetails where Nocert=0;'
    cursr.execute(command)
    c0=cursr.fetchone()[0]
    command='select count(*) from dheemanthdb1.Studentdetails where Nocert=1;'
    cursr.execute(command)
    c1=cursr.fetchone()[0]
    command='select count(*) from dheemanthdb1.Studentdetails where Nocert=2;'
    cursr.execute(command)
    c2=cursr.fetchone()[0]
    command='select count(*) from dheemanthdb1.Studentdetails where Nocert>=3;'
    cursr.execute(command)
    c3=cursr.fetchone()[0]
    print(c0,c1,c2,c3)
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()