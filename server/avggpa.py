import pymysql
import sys
import math

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
try:
    command='select avg(S11G) from Studentdetails;'
    cursr.execute(command)
    avg11=cursr.fetchone()[0]
    command='select avg(S12G) from Studentdetails;'
    cursr.execute(command)
    avg12=cursr.fetchone()[0]
    command='select avg(S21G) from Studentdetails;'
    cursr.execute(command)
    avg21=cursr.fetchone()[0]
    command='select avg(S22G) from Studentdetails;'
    cursr.execute(command)
    avg22=cursr.fetchone()[0]
    avg11=round(avg11,2)
    print(avg11,round(avg12,2),round(avg21,2),round(avg22,2))
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()