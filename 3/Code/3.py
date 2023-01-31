# -*- coding: utf-8 -*-
"""
Oswiadczam ze niniejsza praca bedaca podstawa do ocenienia pracy z labB przemiotu OPA zostala 
wykonana przezemnie samodzielnie
Tadeusz Golczyk
300531
02.12.20r.
"""
'''
Ogółem to strone uruchamiamy na /netflix, udało mi się zaimplementować Update rekordów,
nie zdążyłem dodawania i usuwania.
'''

from flask import Flask
from flask import render_template
from flask import request, redirect, url_for
import sqlite3




app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/netflix/')
def get_netflix():
    conn = sqlite3.connect("netflix_titles.db")
    cursor = conn.cursor()
    query = "SELECT * FROM netflix_titles"
    cursor.execute(query)
    data = cursor.fetchall()
    conn.commit()
    conn.close()
    return render_template('netflix.html', data=data)

@app.route('/netflix2/<int:id>', methods=["GET"])
def get_netflix_update(id):
    try:
        conn = sqlite3.connect("netflix_titles.db")
        cursor = conn.cursor()
        query = "SELECT * FROM netflix_titles WHERE [index]=?"
        cursor.execute(query,(id, ))
        data = cursor.fetchall()
        conn.commit()
        conn.close()
        return render_template('netflix2.html', data=data[0])
    except Exception as err:
        return "Error1! " + str(err), 500


@app.route('/netflix2/', methods=["POST"])
def get_netflix_update_db():
    try:
        index_ = int(request.form['index'])
        #index_=1
        show_id = int(request.form['show_id'])
        #show_id = 1
        type_ = request.form['type']
        #type_ = "Lol"
        title = request.form['title']
        #title = "Lol"
        director = request.form['director']
        #director = "Lol"
        cast = request.form['cast']
        #cast  = "Lol"
        date_added = request.form['date_added']
        #date_added = "Lol"
        release_year = request.form['release_year']
        #release_year = "Lol"
        rating = request.form['rating']
        #rating = "Lol"
        duration = request.form['duration']
        #duration = "Lol"
        
        conn = sqlite3.connect('netflix_titles.db')
        cursor = conn.cursor()
        query = "UPDATE netflix_titles SET [show_id]=? and [type]=?, [title]=?, [director]=?, [cast]=?, [date_added]=?, [release_year]=?, [rating]=?, [duration]=? WHERE [index]=?"
        cursor.execute(query,(show_id,type_,title,director,cast,date_added,release_year,rating,duration,index_))
        conn.commit()
        conn.close()
        return redirect(url_for('get_netflix'))
    except Exception as err:
        return "Error2! " + str(err), 500
    
if __name__ == '__main__':
    app.run()