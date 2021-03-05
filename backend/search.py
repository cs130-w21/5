from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
bp = Blueprint('search', __name__, url_prefix='/api/search')
from form_response import *

@bp.route('/get', methods=['POST'])
def search_results():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            error = 'Data Body Required'
            return errorResponse(error)

        name = data.get('name')
        cla = data.get('classes')
        schedule = data.get('bytes')

        users = redis_client.keys('user*')
        uid_list = []

        if not schedule:
            return errorResponse('Please include bytes (schedule)')
        if not name:
            name = ''
        if not cla:
            cla = []

        for u in users:
            user = redis_client.hgetall(u)
            uid = int(u[4:])

            user_name = construct_name(user)
            classes = redis_client.lrange("classes{}".format(uid), 0, -1)

            cla = set(cla)
            classes = set(classes)

            if 'isTutor' in user.keys():
                isTutor = user['isTutor']=="1"
            else:
                isTutor = False

            user_sched = list(map(int, redis_client.lrange('schedule{}'.format(uid), 0, -1)))
            overlaps = schedule_overlaps(schedule, user_sched)

            if ((name != '' and user_name.find(name) >= 0) or
                    (len(cla.intersection(classes)) > 0) or
                    overlaps) and isTutor:
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
        if schedule[i] == 1 and user_sched[i] == 1:
            return True

    return False


