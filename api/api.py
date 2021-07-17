import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/plants', methods = ['POST', 'GET'])
def plants():
    if request.method == 'POST':
        print('POST')
        return "POSTED!"
    else:
        # list plants
        print('get plants')
        return { "plants": [
            { "id": 1}
        ]}