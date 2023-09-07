from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import PolynomialFeatures
import joblib
import pandas as pd
import pickle
import json
import numpy as np

poly = PolynomialFeatures(degree=4)

label_encoders={'Condition': LabelEncoder(), 'Model': LabelEncoder(), 'Location': LabelEncoder()}
loaded_label_encoders = {}


for variable in label_encoders:
    loaded_label_encoders[variable] = joblib.load(f"{variable}_label_encoder.pkl")


def predictit(data):
    
    with open("./predict_model.pkl", "rb") as f:
        model = pickle.load(f)
    # data='{"Condition":"Used","Model":"iPhone 11","Location":" Panadura,  Kalutara","Box":0,"Space":128}'
    data_dict = json.loads(data)
    new_data = pd.DataFrame([data_dict])  
        
    for column in new_data.select_dtypes(include=['object']):
        new_data[column] = loaded_label_encoders[column].transform(new_data[column])
        
    new_data = poly.fit_transform(new_data) 
    predictions = model.predict(new_data)   
    predictval=predictions[0]

    if(data_dict['Box'] == 0 ):
        return abs(round(predictval))
    else:
        data_dict['Box'] =0
        print(data_dict)
        new_data = pd.DataFrame([data_dict])  
        
        for column in new_data.select_dtypes(include=['object']):
            new_data[column] = loaded_label_encoders[column].transform(new_data[column])
        
        new_data = poly.fit_transform(new_data) 
        predictions = model.predict(new_data)   
        predictval_nobox=predictions[0]
        print(predictval,predictval_nobox)
        if(predictval_nobox>predictval):
            return abs(round(predictval_nobox))
        else:
            return abs(round(predictval))
    
        



def predictit_Without_Location(data):
    with open("./predict_model_without_location.pkl", "rb") as f:
        model = pickle.load(f)
    # data='{"Condition":"Used","Model":"iPhone 11","Location":" Panadura,  Kalutara","Box":0,"Space":128}'
    data_dict = json.loads(data)
    new_data = pd.DataFrame([data_dict])  
       
    for column in new_data.select_dtypes(include=['object']):
        new_data[column] = loaded_label_encoders[column].transform(new_data[column])
    
    new_data = poly.fit_transform(new_data) 
    predictions = model.predict(new_data) 
    predictval=predictions[0] 

    if(data_dict['Box'] == 0 ):
        return abs(round(predictval))
    else:
        data_dict['Box'] =0
        print(data_dict)
        new_data = pd.DataFrame([data_dict])  
        
        for column in new_data.select_dtypes(include=['object']):
            new_data[column] = loaded_label_encoders[column].transform(new_data[column])
        
        new_data = poly.fit_transform(new_data) 
        predictions = model.predict(new_data)   
        predictval_nobox=predictions[0]
        print(predictval,predictval_nobox)
        if(predictval_nobox>predictval):
            return abs(round(predictval_nobox))
        else:
            return abs(round(predictval))
