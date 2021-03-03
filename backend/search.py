from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('search', __name__, url_prefix='/api/search')
from form_response import *

@bp.route('/get', methods=['GET'])
def search_results():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'GET':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            return errorResponse(error)

        name = data.get('name')
        cla = data.get('class') # TODO multiple classes
        major = data.get('major')
        schedule = data.get('bytes')
        # TODO schedule overlap 2d array 7x6

        users = redis_client.keys('user*')
        uid_list = []
        for u in users:
            user = redis_client.hgetall(u)
            uid = int(u[-1])

            user_name = construct_name(user)
            classes = redis_client.lrange("classes{}".format(uid), 0, -1)
            if 'major' in user.keys():
                user_major = user['major']
            else:
                user_major = ''

            if cla:
                cla = set(cla)
                classes = set(classes)

            if 'isTutor' in user.keys():
                isTutor = user['isTutor']=="1"
            else:
                isTutor = False

            user_sched = redis_client.get('schedule{}'.format(uid))
            overlaps = schedule_overlaps(schedule, user_sched)

            if (not name or user_name.find(name) >= 0) and \
                    (not cla or len(cla.intersection(classes)) > 0) and \
                    (not major or user_major.find(major) >= 0) and \
                    (not schedule or overlaps) and \
                    (isTutor):
                uid_list.append(uid)

        return jsonResponse(uid_list)

    return jsonResponse()

def construct_name(user):
    name = []
    if 'fname' in user.keys():
        name.append(user['fname'])
    if 'lname' in user.keys():
        name.append(user['lname'])

    return ' '.join(name)

def schedule_overlaps(schedule, user_sched):
    if not schedule or not user_sched:
        return False

    for i in range(len(schedule)):
        if schedule[i] == user_sched[i]:
            return True

    return False


