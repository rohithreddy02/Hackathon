import pandas as pd
import pymysql
from sklearn.cluster import KMeans

n=int(input())

db_connect=pymysql.connect(host='127.0.0.1',database='dheemanthdb1',user='root',password="Dheemanth@127")
df=pd.read_sql('SELECT * from studentdata',con=db_connect)

#mycursor = db_connect.cursor()
#mycursor.execute("INSERT ")

df['Total']=df['acad']+df['co-circ']+df['extra-circ']

print(df.head())
df2=df['rollno']
del df['rollno']

size = n
selected_cols=["Total","acad","co-circ","extra-circ"]
cluster_data=df.loc[:,selected_cols]

kmeans_sel=KMeans(init='k-means++',n_clusters=n,n_init=100,random_state=1).fit(df,sample_weight=None)
labels=pd.DataFrame(kmeans_sel.labels_)

clustered_data=cluster_data.assign(Cluster=labels)

# Calculate the size of each cluster
cluster_sizes = clustered_data.groupby(["Cluster"]).size()

# Group the data by cluster and calculate the mean
grouped_km = clustered_data.groupby(["Cluster"]).mean().round(2)

clustered_data['rollno']=df2
# Add the cluster sizes to the grouped_km DataFrame
grouped_km["Cluster Size"] = cluster_sizes

grouped_km=grouped_km.sort_values(by=['Total'],ascending=False)
grouped_km['Type']=[chr(ord('A')+i) for i in range(n)]

print(grouped_km)