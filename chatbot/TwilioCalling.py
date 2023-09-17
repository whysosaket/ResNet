from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS, cross_origin

account_sid = "ACf911e559dc38b0b66b6dee8047f515a1"
auth_token = "762f8139702ae50ecdf9feba85b4be11"

client = Client(account_sid, auth_token)

from_phone_number = "+19737759933"

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/make_call', methods=['POST'])
@cross_origin()
def make_twilio_call():
    try:
        to_phone_number = "+919596181712"

        call = client.calls.create(
            to=to_phone_number,
            from_=from_phone_number,
            url='http://demo.twilio.com/docs/voice.xml'
        )

        return "", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

