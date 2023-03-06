import pandas as pd
import matplotlib.pyplot as plt
from connection import create_connection

db = create_connection()

df = pd.read_sql('select * from studentgpa', con=db)

labels = ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5', 'SEM 6']
y = [df['sem1gpa'], df['sem2gpa'], df['sem3gpa'], df['sem4gpa'], df['sem5gpa'], df['sem6gpa']]
x = [1, 2, 3, 4, 5, 6]

fig, ax = plt.subplots()

plt.plot(x, y)
plt.xticks(x, labels)

for i in range(len(y)):
    ax.vlines(i+1, ymin=5, ymax=10, color='black', alpha=0.2)

plt.title('Academic Performance of Students Semester wise', fontsize=17)
plt.xlabel('No of Semesters --->', fontsize=14)
plt.ylabel('Grade Point Average --->', fontsize=14)

# plt.show()
plt.savefig('Charts/parallelcoor.png')
