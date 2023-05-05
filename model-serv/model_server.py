import pickle
import json
from flask import Flask, request, jsonify

app = Flask(__name__)
svm_model = pickle.load(open("svm.model",'rb'))

@app.post("/blogposts/validate")
def validate_request():
    print(request)
    request_data = request.get_json()
    test_payloads = []
    test_payloads.append(json.dumps(request_data))
    result = svm_model.predict(test_payloads)
    if result[0] == '0':
        return jsonify({"malicious": False})
    else:
        return jsonify({"malicious": True})
    
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

if __name__=='__main__':
    app.run(debug=True)