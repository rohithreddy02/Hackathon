import pandas as pd
import pymysql

db_connect=pymysql.connect(host="dheemanthdb1.cspqrfmzp8xf.ap-south-1.rds.amazonaws.com",user="admin",passwd="Dheemanth12",database="dheemanthdb1")
df=pd.read_sql('SELECT Rollno,Name,TotalGpa,Nocert,Extra from Studentdetails',con=db_connect)

# print(df.columns)
# normalize the data
df_norm = (df.iloc[:, 2:] - df.iloc[:, 2:].mean()) / df.iloc[:, 2:].std()

# set the weights for each column
weights = [0.6, 0.2, 0.2]

# calculate the weighted sum
df_norm['Total'] = df_norm.iloc[:, 0] * weights[0] + df_norm.iloc[:, 1] * weights[1] + df_norm.iloc[:, 2] * weights[2]
df_norm['Rollno']=df['Rollno']
# sort the dataframe based on the total
df_sorted = df_norm.sort_values('Total', ascending=False)

# merge the results with the original dataframe
df_result = pd.merge(df_sorted[['Rollno','Total']],df, on='Rollno')

# print the results
print(df_result)
db_connect.close()