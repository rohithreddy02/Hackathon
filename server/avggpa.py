import pymysql
import sys

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
    res=[avg11,avg12,avg21,avg22]
    print(avg11,avg12,avg21,avg22)
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()