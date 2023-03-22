import email.message
import smtplib

# Create a message object
msg = email.message.Message()

# Set the message headers
msg['Subject'] = 'Test message'
msg['From'] = 'hackathon73@gmail.com'
msg['To'] = 'srujansk14@gmail.com'

# Set the message content
msg.set_payload('This is a test message.')

# Send the message
smtp_obj = smtplib.SMTP('smtp.gmail.com', 587)
smtp_obj.starttls()
smtp_obj.login('hackathon73@gmail.com', 'xrzdcgfyysxihzpd')
smtp_obj.sendmail(msg['From'], [msg['To']], msg.as_string())
smtp_obj.quit()