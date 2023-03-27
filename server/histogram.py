from connection import create_connection
import pandas as pd
import numpy as np
from scipy.stats import norm
import matplotlib.pyplot as plt
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

# Connect to the database
db = create_connection()

# Retrieve data from the database
df = pd.read_sql('select * from Studentdetails', con=db)

# Set the parameters for the normal distribution
sigma, mu = 1, 0

# Create a histogram of the data
n, bins, patches = plt.hist(df['TotalGpa'], color='orange', alpha=0.8, bins=[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10], density=False)
plt.xlim(5.75,10)
plt.grid(axis='both')

# Fit the normal distribution to the data and print the standard deviation
mu, std = norm.fit(df['TotalGpa'])
print(std)

# Create the x-axis data and the probability density function
xmin, xmax = plt.xlim()
x = np.arange(xmin, xmax, 0.1)
p = norm.pdf(x, mu, std)

# Plot the probability density function and the histogram bars
plt.plot(x, 25*p, '--', linewidth=1)

# Add labels to the histogram bars
for i in range(len(patches)):
    plt.text(x=(bins[i]+bins[i+1])/2, y=n[i]+0.1, s=int(n[i]), ha='center')

# Add title and axis labels to the plot
plt.title('Academic Performance of Students', fontsize=20)
plt.xlabel('Cummulative GPA of Students ---->', fontsize=15)
plt.ylabel('No of Students ---->', fontsize=15)

# Save the plot as an image file in memory
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