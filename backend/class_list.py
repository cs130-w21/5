import csv, json, os

import flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('class_list', __name__, url_prefix='/api/classList')

@bp.route('/get', methods=['GET'])
def class_list():
    response = None
    if request.method == 'GET':
        data = request.get_json(force=True)
        subjectArea = data['subjectArea']
        this_folder = os.path.dirname(os.path.abspath(__file__))
        class_file = open(os.path.join(this_folder, 'resources/classes.csv'), mode='r')
        reader = csv.reader(class_file)

        error = None

        if not subjectArea:
            error = 'Subject Area Required'
            response = flask.Response(status=400, content_type='text/html', data=error)

        else:
            classes = []
            for row in reader:
                if row[0] == subjectArea:
                    classes.append(row[0] + ' ' + row[2])
            resp_body = {"error": False, "errMsg": None, "payload": {"classList": classes}}
            resp_body_json = json.dumps(resp_body)
            response = flask.Response(status=200, content_type='application/json', response=resp_body_json)

        class_file.close()

    return response
