from flask import Flask, request, jsonify
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain import PromptTemplate
import os

app = Flask(__name__)

os.environ["OPENAI_API_KEY"] = "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"

llm = OpenAI(temperature=0.2)

template = '''I want you to analyze the sentiment of the victim and act as a guide to a victim of an emergency/disaster and provide relevant help, tips like first aid, and answer any questions to help the victim/s in the event of {disaster_type}. The user's input message is: {input_message}. Give the answer in less than 30 words wrap the answer it by "***" in the start and in the end of that point'''
prompt1 = PromptTemplate(input_variables=['disaster_type', 'input_message'], template=template)

@app.route('/chatbot', methods=['POST'])
def analyze_disaster():
    try:
        data = request.get_json()
        disaster_type = data.get('disaster_type', '')
        input_message = data.get('input_message', '')
        chain1 = LLMChain(llm=llm, prompt=prompt1)
        response = chain1.run({'disaster_type': disaster_type, 'input_message': input_message})

        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(_,port=3000)