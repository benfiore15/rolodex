from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from scipy.sparse import csr_matrix
import pickle
import pandas as pd
import json

app = Flask(__name__)

#Load the model from the disk
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)
with open('columns.pkl', 'rb') as columns_file:
    columns = pickle.load(columns_file)

with open('location_encoder.pkl', 'rb') as location_file:
    encoder = pickle.load(location_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get request data
    data = request.get_json(force=True)

    # print("RAW DATA", data)

    columnsList = columns.tolist()
    

    # print("Model Columns", columnsList)
    # print("Model Columns Type", type(columnsList))

    # # Load the input JSON string
    # try:
    #     input_dict = json.loads(request.get_json) #load the string as a dictionary
    #     input_df = pd.DataFrame([input_dict]) #create a DataFrame from the dictionary
    # except json.JSONDecodeError:
    #     print("Error: Invalid JSON string.")
    #     return None

    df_Columns = None
    # df_Data = None

    #Make sure the data is a list
    if isinstance(data, list):
        df_Data = pd.DataFrame(data)
        print("DF DATA", df_Data)

    if isinstance(columns, list):
        df_Columns = pd.DataFrame(columns)

    # print(data)
    # print("Type", type(data))
    # print("Type", type(df_Columns))
    # print("Type", type(df_Data))

    column_transformer = ColumnTransformer([('encoder', OneHotEncoder(), [0, 1])], remainder='passthrough')
    df_Encoded = pd.DataFrame(column_transformer.fit_transform(df_Data))

    for col in columnsList:
        if col not in df_Encoded.columns:
            df_Encoded[col] = 0
    # print("UPDATED DATA DF:", df_Data.columns)


    # Encode the input data
    # data['office_loc'] = encoder.transform(df_Data['office_loc'])
    # data['job_role'] = encoder.transform(df_Data['job_role'])

    sparse_matrix = csr_matrix(df_Encoded.values)

    # Make a prediction
    prediction = model.predict(sparse_matrix)
    # print(df_Encoded)
    # print("Type", type(df_Encoded))
    

    # Add predictions to the DataFrame
    # data['predicted_salary'] = prediction

    #Return the prediction
    # return jsonify(prediction.tolist())
    # return data[['name','office_loc', 'job_role','predicted_salary']]
    return "Hello, world!"


if __name__ == '__main__':
    app.run(port=5000, debug=True)