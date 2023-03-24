import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
username=sys.argv[1]
try:
    command='select TotalGpa,TotalBacklogs,Nocert,Extra,S11G,S12G,S21G,S22G,S11B,S12B,S21B,S22B,Name from Studentdetails where Rollno="'+username+'";'
    cursr.execute(command)
    TotalGpa,TotalBacklogs,Nocert,Extra,S11G,S12G,S21G,S22G,S11B,S12B,S21B,S22B,Name=cursr.fetchone()
    print(TotalGpa,TotalBacklogs,Nocert,Extra,S11G,S12G,S21G,S22G,S11B,S12B,S21B,S22B,Name)
    sys.stdout.flush()
except:
    db_connect.rollback()
db_connect.close()