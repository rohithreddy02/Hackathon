import pandas as pd
import matplotlib.pyplot as plt
from connection import create_connection

db = create_connection()

df = pd.read_sql('select * from Studentdetails', con=db)

labels = ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4']
total_students = len(df['S11G'])
y = [sum(df['S11G']) / total_students, sum(df['S12G']) / total_students , sum(df['S21G']) / total_students , sum(df['S22G']) / total_students]
x = [0, 1, 2, 3]
fig, ax = plt.subplots()

plt.plot(y, linewidth=3, marker='.', markersize=17, color='red')
plt.xticks(x, labels)

for i in range(len(y)):
    ax.vlines(i, ymin=5, ymax=10, color='black', alpha=0.2)

plt.title('Average GPA of Total Students in each Semester', fontsize=17)
plt.xlabel('No of Semesters --->', fontsize=14)
plt.ylabel('Average GPA --->', fontsize=14)

# plt.show()
plt.savefig('../assets/img/Charts/parallelcoor.png')
