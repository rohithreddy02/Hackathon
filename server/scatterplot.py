import pandas as pd
import matplotlib.pyplot as plt
from connection import create_connection
import io
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseUpload

SERVICE_ACCOUNT_FILE = 'jovial-circuit-381917-d54006a1885f.json'
SCOPES = ['https://www.googleapis.com/auth/drive']

creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=creds)


# Authenticate and create the Drive API client
drive_service = build('drive', 'v3', credentials=creds)

# Define the folder ID in which the file will be saved
folder_id = '1cnbwxFh7mmZfvLsA3tAtyHwOVIgFgxcx'

db = create_connection()
colors = ['red', 'green', 'blue', 'orange', 'yellow', 'violet']
df = pd.read_sql('select * from Studentdetails', con=db)

weights = {}
for i in range(len(df['Extra'])):
    if df['Extra'][i] == 'Volunteer':
        weights[df['Extra'][i]] = 1
    elif df['Extra'][i] == 'Board Member':
        weights[df['Extra'][i]] = 1
    else:
        weights[df['Extra'][i]] = 1

plt.scatter(df['Nocert'], df['TotalGpa'], alpha=0.75, c=df['Extra'],
            marker='o', cmap='viridis', s=75*weights + 150, edgecolors='gray')
plt.title('Student Overall performance', fontsize=20)
plt.xlabel('Student cocurricular activities ---->', fontsize=12)
plt.ylabel('Student Grades ---->', fontsize=12)

cbar = plt.colorbar()
cbar.set_label('Student Extracurricular Activities ---->', fontsize=12)

image_file = io.BytesIO()
plt.savefig(image_file, format='png')
image_file.seek(0)

# Create the file metadata
file_metadata = {'name': 'histogram.png', 'parents': [folder_id], 'mimeType': 'image/png'}

# Create the media object for the file upload
media = MediaIoBaseUpload(image_file, mimetype='image/png', resumable=True)

# Upload the file to Google Drive
updated_file = drive_service.files().update(fileId="1iNdmJb-P68tpAC8VVZ3N2MHfjYsFbuq8", media_body=media).execute()

# Close the plot
plt.close()
db.close()