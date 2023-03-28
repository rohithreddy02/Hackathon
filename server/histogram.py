from connection import create_connection
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from scipy.stats import norm

db = create_connection()

df = pd.read_sql('select * from Studentdetails', con=db)

sigma, mu = 1, 0

n, bins, patches = plt.hist(df['TotalGpa'], color='orange', alpha=0.8, bins=[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10], density=False)
plt.xlim(5.75,10)
plt.grid(axis='both')

mu, std = norm.fit(df['TotalGpa'])
print(std)
xmin, xmax = plt.xlim()
x = np.arange(xmin, xmax, 0.1)

p = norm.pdf(x, mu, std)
  
plt.plot(x, 25*p, '--', linewidth=1)

for i in range(len(patches)):
    plt.text(x=(bins[i]+bins[i+1])/2, y=n[i]+0.1, s=int(n[i]), ha='center')

plt.title('Academic Performance of Students', fontsize=20)
plt.xlabel('Cummulative GPA of Students ---->', fontsize=15)
plt.ylabel('No of Students ---->', fontsize=15)
# plt.show()
plt.savefig('./assets/img/Charts/histogram.png')