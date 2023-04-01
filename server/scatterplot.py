import pandas as pd
import matplotlib.pyplot as plt
from connection import create_connection

db = create_connection()
colors = ['red', 'green', 'blue', 'orange', 'yellow', 'violet']
df = pd.read_sql('select * from Studentdetails', con=db)



plt.scatter(df['Nocert'], df['TotalGpa'], alpha=0.75, c=df['Extra'],
            marker='o', cmap='viridis', s=75*df['Extra'] + 150, edgecolors='gray')
plt.title('Student Overall performance', fontsize=20)
plt.xlabel('Student cocurricular activities ---->', fontsize=12)
plt.ylabel('Student Grades ---->', fontsize=12)

cbar = plt.colorbar()
cbar.set_label('Student Extracurricular Activities ---->', fontsize=12)

# plt.show()

plt.savefig('./assets/img/Charts/scatter_plot.png')