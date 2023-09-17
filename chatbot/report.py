from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain import PromptTemplate
import os

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
os.environ["OPENAI_API_KEY"] = "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"
llm = OpenAI(temperature=0.5)
key = "esKz29rBWkcH_7KlD6DQXrd6Gtww9shKaA2jTt5Mamc"

@app.route('/generate_report', methods=['POST'])
@cross_origin()
def generate_incident_report():
    try:
        inputdata = request.get_json()
        lat = inputdata.get('lat', '')
        long = inputdata.get('long', '')
        incident_type = inputdata.get('incident_type', '')
        time = inputdata.get('time', '')
        authority_comments = inputdata.get('authority_comments', '')
        time_of_arrival = inputdata.get('time_of_arrival', '')
        responding_dept = inputdata.get('responding_dept', '')

        url = f'https://atlas.microsoft.com/search/address/reverse/crossstreet/json?&api-version=1.0&subscription-key={key}&language=en-US&query={str(lat)},{str(long)}'
        response = requests.get(url)
        results = response.json()
        freeform_address = results['addresses'][0]['address']['freeformAddress']
        municipality = results['addresses'][0]['address']['municipality']

        template = '''I want you to act as a reporter and generate a comprehensive official incident report for a disaster of {disaster_type} which happened at {location} on {time} and was solved by {responding_dept} at {time_of_arrival} with comments {authority_comments} from the information given to you. Keep it professional and factual while also making it informative'''

        prompt1 = PromptTemplate(input_variables=['disaster_type', 'location', 'time', 'authority_comments', 'responding_dept', 'time_of_arrival'], template=template)

        prompt1.format(
            disaster_type="the type/category of the disaster/incident",
            location='the address of the disaster scene',
            time="the time with date both in 12-hour and 24-hour IST (input is given in Unix timestamp format)",
            authority_comments="the review of the situation by the authorities if any",
            time_of_arrival="the time of disaster occurrence",
            responding_dept="the name of the authority along with its type"
        )

        chain2 = LLMChain(llm=llm, prompt=prompt1)
        generated_text = chain2({
            'disaster_type': incident_type,
            'location': freeform_address,
            'time': time,
            'authority_comments': authority_comments,
            'responding_dept': responding_dept,
            'time_of_arrival': time_of_arrival
        })['text']

        data = [freeform_address, municipality, generated_text]
        response = {"data": data}
        
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)