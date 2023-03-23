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
    command='select count(*) from Studentdetails where Rollno="'+rollno+'";'
    cursr.execute(command)
    count=cursr.fetchone()[0]
    if count==0:
        command='insert into Studentdetails values("'+rollno+'","'+name+'","'+email+'","'+s11_g+'","'+s11_b+'","'+s12_g+'","'+s12_b+'","'+s21_g+'","'+s21_b+'","'+s22_g+'","'+s22_b+'","'+totalBacklogs+'","'+totalGpa+'","'+noCert+'","'+extra+'");'
        cursr.execute(command)
    else:
        command='update Studentdetails set Rollno='+rollno+',Name='+name+',email='+email+',S11G='+s11_g+',S12G='+s12_g+',S21G='+s21_g+',S22G='+s22_g+',S11B='+s11_b+',S12B='+s12_b+',S21B='+s21_b+',S22B='+s22_b+',TotalBacklogs='+totalBacklogs+',TotalGpa='+totalGpa+',Nocert='+noCert+',Extra='+extra+' where Rollno='+rollno+';'
        cursr.execute(command)
    db_connect.commit()
except:
    db_connect.rollback()
db_connect.close()

import email.message
import smtplib

# Create a message object
msg = email.message.Message()

# Set the message headers
msg['Subject'] = 'SSPS Admin'
msg['From'] = 'hackathon73@gmail.com'
msg['To'] = rollno+'@sreenidhi.edu.in'

# Set the message content
msg.set_payload('Hi '+name+' we have received your details successfully\n\nThank you for using our website\nRegards SSPS Admin\nDo not Reply System Generated Email')

# Send the message
smtp_obj = smtplib.SMTP('smtp.gmail.com', 587)
smtp_obj.starttls()
smtp_obj.login('hackathon73@gmail.com', 'xrzdcgfyysxihzpd')
smtp_obj.sendmail(msg['From'], [msg['To']], msg.as_string())
smtp_obj.quit()

msg2=email.message.Message()
msg2['Subject']='SSPS Admin'
msg2['From']='hackathon73@gmail.com'
msg2['To']='snist.ssps@gmail.com'
msg2.set_payload('Hi '+name+' of RollNumber:'+rollno+' has uploaded details successfully verify the details ')

smtp2=smtplib.SMTP('smtp.gmail.com',587)
smtp2.starttls()
smtp2.login('hackathon73@gmail.com', 'xrzdcgfyysxihzpd')
smtp2.sendmail(msg2['From'], [msg2['To']], msg2.as_string())
smtp2.quit()