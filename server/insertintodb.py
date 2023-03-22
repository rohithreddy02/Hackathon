import pymysql
import sys

#connect database
db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
cursr=db_connect.cursor()
username=str(sys.argv[1])
email=str(sys.argv[2])
password=str(sys.argv[3])
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

import email.message
import smtplib

# Create a message object
msg = email.message.Message()

# Set the message headers
msg['Subject'] = 'SSPS Admin'
msg['From'] = 'hackathon73@gmail.com'
msg['To'] = username+'@sreenidhi.edu.in'

# Set the message content
msg.set_payload('Hi '+username+' your account is created successfully\n\nThank you for using our website\nRegards SSPS Admin')

# Send the message
smtp_obj = smtplib.SMTP('smtp.gmail.com', 587)
smtp_obj.starttls()
smtp_obj.login('hackathon73@gmail.com', 'xrzdcgfyysxihzpd')
smtp_obj.sendmail(msg['From'], [msg['To']], msg.as_string())
smtp_obj.quit()