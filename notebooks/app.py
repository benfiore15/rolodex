from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

#Load the model from the disk
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get request data
    data = request.get_json(force=True)

    #Make sure the data is a list
    if isinstance(data, dict):
        data = [data]
    print(data)

    # Make a prediction
    prediction = model.predict(pd.DataFrame(data))

    #Return the prediction
    return jsonify(prediction.tolist())

if __name__ == '__main__':
    app.run(port=5000)