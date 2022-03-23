import pandas as pd
import json 

data = ['id','admin_name','lat','lng','population',]
df = pd.read_json('./ke.json')
#print(df[data])
df_new = df[data]
#print(df_new)
df_new.to_json('outputDT.json',orient='records')