# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 17:25:43 2020

@author: Ted
"""

from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/hello')

def hello_world():
    return "Hello World!!!"

@app.route('/image')
def index2():
    return app.send_static_file('index2.html')    

if __name__ == '__main__':
    app.run()