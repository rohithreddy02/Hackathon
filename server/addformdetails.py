import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()

#Taking the details.

name=  str(sys.argv[1])
rollno=str(sys.argv[2])
email= str(sys.argv[3])
s11_g= str(sys.argv[4])
s11_b= str(sys.argv[5])
s12_g= str(sys.argv[6])
s12_b= str(sys.argv[7])
s21_g= str(sys.argv[8])
s21_b= str(sys.argv[9])
s22_g= str(sys.argv[10])
s22_b= str(sys.argv[11])
totalBacklogs= str(sys.argv[12])
totalGpa=str(sys.argv[13])
noCert=str(sys.argv[14])
extra=str(sys.argv[15])

#ADDING THE VALUES INTO Studentdetails
try:
    command='insert into Studentdetails values("'+rollno+'","'+name+'","'+email+'","'+s11_g+'","'+s11_b+'","'+s12_g+'","'+s12_b+'","'+s21_g+'","'+s21_b+'","'+s22_g+'","'+s22_b+'","'+totalBacklogs+'","'+totalGpa+'","'+noCert+'","'+extra+'");'
    cursr.execute(command)
    db_connect.commit()
except:
    db_connect.rollback()
db_connect.close()