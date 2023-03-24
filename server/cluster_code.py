import pandas as pd
from sklearn.cluster import KMeans
import sys
from connection import create_connection

n=int(sys.argv[1])

db = create_connection()
df=pd.read_sql('SELECT Rollno,TotalGpa,Nocert,Extra from Studentdetails',con=db)

#mycursor = db_connect.cursor()
#mycursor.execute("INSERT ")
df['Nocert']=df['Nocert'].apply(lambda x:min(10,x*2))
df['Extra']=df['Extra'].apply(lambda x:min(10,x*3))
df['Total']=df['TotalGpa']+df['Nocert']+df['Extra']

df2=df['Rollno']
del df['Rollno']

size = n
selected_cols=["Total","TotalGpa","Nocert","Extra"]
cluster_data=df.loc[:,selected_cols]

kmeans_sel=KMeans(init='k-means++',n_clusters=n,n_init=100,random_state=1).fit(df,sample_weight=None)
labels=pd.DataFrame(kmeans_sel.labels_)

clustered_data=cluster_data.assign(Cluster=labels)

# Calculate the size of each cluster
cluster_sizes = clustered_data.groupby(["Cluster"]).size()

# Group the data by cluster and calculate the mean
grouped_km = clustered_data.groupby(["Cluster"]).mean().round(2)

# Add the cluster sizes to the grouped_km DataFrame
grouped_km["Cluster-Size"] = cluster_sizes

grouped_km=grouped_km.reindex(columns=['Grade', 'Cluster-Size', 'TotalGpa','Nocert','Extra','Total'])

grouped_km=grouped_km.sort_values(by=['Total'],ascending=False)
grouped_km['Grade']=[chr(ord('A')+i) for i in range(n)]
print(grouped_km)
print()
sys.stdout.flush()

grouped_data = clustered_data.groupby(["Cluster"])
# del(grouped_data['Total'])
# del(grouped_data['TotalGpa'])
# del(grouped_data['Nocert'])
# del(grouped_data['Extra'])

# cluster_dfs = {}
# for cluster_label, group in grouped_data:
#     # Get the Rollno values of students in this cluster
#     rollnos = df2[group.index]
#     # Add the Rollno column to the group DataFrame
#     group = pd.concat([rollnos, group], axis=1)
#     # Add the DataFrame to the dictionary
#     cluster_dfs[cluster_label] = group

# for i in range(n):
#     cluster_df = cluster_dfs[i]
#     cluster_df = cluster_df.loc[:, ['Cluster', 'Rollno']]
#     print(cluster_df)
#     print()
#     sys.stdout.flush()



db.close()

