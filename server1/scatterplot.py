import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from connection import create_connection

db = create_connection()
colors = ['red', 'green', 'blue', 'orange', 'yellow', 'violet']
barWidth = 0.5
df = pd.read_sql('select * from studentperformance', con=db)

# fig, ax = plt.subplots()
# bars = ax.bar(df['name'], df['gpa'], color=colors, width=barWidth)

# plt.show()

plt.scatter(df['cocurricular'], df['gpa'], alpha=0.75, c=df['extracurricular'],
            marker='o', cmap='viridis', s=25*df['extracurricular'] + 150, edgecolors='gray')
plt.title('Student Overall performance', fontsize=20)
plt.xlabel('Student cocurricular activities   ---->', fontsize=12)
plt.ylabel('Student Grades   ------>', fontsize=12)

cbar = plt.colorbar()
cbar.set_label('Student Extracurricular Activities ---->', fontsize=12)

# plt.show()

# buffer = BytesIO()
# plt.savefig(buffer, format='svg')
# buffer.seek(0)
# image_data = buffer.getvalue().decode('utf-8')
# encoded_image = base64.b64encode(image_data.encode('utf-8')).decode('utf-8')

# html = f'<div style="width:50%">{encoded_image}</div>'
# print(html)
plt.savefig('scatter_plot.png')