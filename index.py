from flask import Flask, url_for, render_template, jsonify
app = Flask(__name__)
import csv
import pandas as pd




@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/getData/<int:year>")
def getData(year):
    revenue = pd.read_csv("static/data/1_Revenues.csv")
    # with open() as csvfile:
    #   revenuesReader = csv.DictReader(csvfile)

    if year < 1942 or year > 2008:
        return "Error in the year range"

    filteredRevenue = revenue[revenue['Year4']==year][["Name","Year4", "Total Revenue","Population (000)"]]
    # filteredRevenue = [x for x in revenuesReader ]
    # show the post with the given id, the id is an integer
    return filteredRevenue.to_json(orient='records')
