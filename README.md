Flask + D3 example
======

A simple demo that shows how to create a full stack visualization application that leverages the backend for loading only the data necessary (based on user parameters) for visualizing in the Front End.

This demo uses data from data.gov (Sorry I lost the detailed link), with historical information for th US States. It shows a choropleth map of the states, with the total Revenue per state. See a demo here: http://people.ischool.berkeley.edu/~jguerra/w209/

## How to run it?

Make sure you have Flask installed (if having problems make sure to check [the Flask documentation on installation](http://flask.pocoo.org/docs/1.0/installation/) )

```
$ pip install Flask
$ pip install pandas
```

Then run it like this:

```
$ FLASK_APP=w209.py flask run
```

Then open your browser on http://localhost:5000

## Structure:

Your **backend** goes on [/w209.py](/w209.py), the one on this example simply loads a csv file using pandas, and sends a JSON response with the states revenues for each year, try it with [http://localhost:5000/getData/2008]

The **frontend** is a simple HTML file that you can find on [/templates/index.html](/templates/index.html), and that loads all of its resources from the [/static](/static) folder. There are folders for [/static/js]([/static/js]), [/static/css](/static/css) and [/static/data](/static/data)


