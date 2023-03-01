import pandas as pd
from sklearn.cluster import KMeans

df=pd.read_csv('studentdata.csv.txt')

df['Total']=df['acad']+df['co-circ']+df['extra-circ']


print(df.head())

input = 6
selected_cols=["Total","acad","co-circ","extra-circ"]
cluster_data=df.loc[:,selected_cols]

kmeans_sel=KMeans(init='k-means++',n_clusters=input,n_init=100,random_state=1).fit(df,sample_weight=None)
labels=pd.DataFrame(kmeans_sel.labels_)

clustered_data=cluster_data.assign(Cluster=labels)
clustered_data['student_id']=df['student_id']

# Calculate the size of each cluster
cluster_sizes = clustered_data.groupby(["Cluster"]).size()

# Group the data by cluster and calculate the mean
grouped_km = clustered_data.groupby(["Cluster"]).mean().round(2)

# Add the cluster sizes to the grouped_km DataFrame
grouped_km["Cluster Size"] = cluster_sizes

del grouped_km['student_id']

grouped_km=grouped_km.sort_values(by=['Total'],ascending=False)
grouped_km['Type']=[chr(ord('A')+i) for i in range(input)]

print(grouped_km)
