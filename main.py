#!/usr/bin/env python
# coding: utf-8

# In[3]:


#!/usr/bin/env python
# coding: utf-8

# In[5]:


import numpy as np
import pandas as pd
import sys
import json

kuku = pd.read_csv('../python/database.csv')
kuku
print(kuku)
# In[6]:


num_rating_df = kuku.groupby('Hostel_Name').count()['Hostel Rating Simple'].reset_index()
num_rating_df.rename(columns={'Hostel Rating Simple':'num_ratings'},inplace=True)
num_rating_df


# In[7]:


avg_rating_df = kuku.groupby('Hostel_Name').mean()['Hostel Rating Simple'].reset_index()
avg_rating_df.rename(columns={'Hostel Rating Simple':'avg_rating'},inplace=True)
avg_rating_df


# In[8]:


popular_df = kuku.merge(avg_rating_df,on='Hostel_Name')
yoyo=popular_df.merge(num_rating_df,on='Hostel_Name')
# print(yoyo)
#popular_df


# In[9]:


yoyo = yoyo[yoyo['num_ratings']>=2].sort_values('avg_rating',ascending=False).head(50)

# In[10]:



# In[11]:


yoyo['tags'] = yoyo['Hostel Rating'] + yoyo['Hostel Location'] + yoyo['Boys/Girls Hostel']
# print(yoyo)

# In[12]:


yoyo['tags'].apply(lambda x:[i.replace(" ","")for i in x])
yoyo


# In[13]:


#yoyo['tags'].apply(lambda x:[i.replace(" ","")for i in x])


# In[14]:


#yoyo['tags'] = yoyo['tags'].apply(lambda x: "".join(x))


# In[15]:


yoyo['tags'] = yoyo['tags'].apply(lambda x:x.lower())

# In[16]:


yoyo


# In[17]:


from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=500,stop_words='english')
    


# In[18]:


vector = cv.fit_transform(yoyo['tags']).toarray()
vector

# print(vector)
# In[19]:


cv.get_feature_names()


# In[20]:


from sklearn.metrics.pairwise import cosine_similarity


# In[21]:


similarity = cosine_similarity(vector)
# print(similarity)
# In[22]:


index = sorted(list(enumerate(similarity[0])),reverse=True,key=lambda x:x[1])
# print(index)

# In[23]:
class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)
 

def recommend(Hostel_Name):
    hostel_index = yoyo[yoyo['Hostel_Name'] == Hostel_Name].index[0]
    distances = similarity[hostel_index]
    n = set()
#     print(distances)
    hostel_list= sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])
    for i in hostel_list:
        if( yoyo.iloc[i[0]].Hostel_Name != Hostel_Name):
            n.add(yoyo.iloc[i[0]].Hostel_Name)
    
    output = json.dumps(n, cls=SetEncoder)
    print(output)
recommend('scholar park')
# print(yoyo["Hostel_Name"] == "Scholars Park ")
# recommend(sys.argv[1])


# data_str = json.dumps(set([1,2,3,4,5]), cls=SetEncoder)
# print(data_str)

# In[ ]:





# In[ ]:





# In[24]:



# In[232]:





# In[ ]:





# In[ ]:





# In[ ]:




