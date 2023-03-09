import pandas as pd
import matplotlib.pyplot as plt
from connection import create_connection

db = create_connection()
colors = ['red', 'green', 'blue', 'orange', 'yellow', 'violet']
df = pd.read_sql('select * from studentperformance', con=db)

x = list(df['backlogs'])
y = list(df['cocurricular'])
z = list(df['extracurricular'])

cx = cy = cz = 0
for i in range(len(x)):
    if x[i] > 0:
        cx += 1
    if y[i] > 0:
        cy += 1
    if z[i] > 0:
        cz += 1

explode = [0.1, 0, 0]
wedges, texts, autotexts = plt.pie([cx, cy, cz], autopct='%1.1f%%', explode=explode, shadow=True, radius=0.8)

plt.legend(wedges, ['Backlogs', 'Cocurricular', 'Extracurricular'], loc='lower right', bbox_to_anchor=(1, 0, 0.25, 1), fontsize=12)
plt.title('Pie Chart Representing The Overall Performance', fontsize=18)
# plt.show()

plt.savefig('Charts/piechart.png')
