import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
import flask
from werkzeug.security import check_password_hash, generate_password_hash

import json
import datetime
from form_response import *

bp = Blueprint('notification', __name__, url_prefix='/api/notification')

@bp.route('/add', methods=('GET', 'POST'))
def set():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            error = 'Data Body Required'
            return errorResponse(error)
        uid = data['uid'] if 'uid' in data.keys() else None
        notification = data['notification'] if 'notification' in data.keys() else None
        if uid is None:
            error = 'uid is required.'
            return errorResponse(error)
        elif bytes is None:
            error = 'bytes is required.'
            return errorResponse(error)
        for entry in ['msg', 'createdDate', 'read', 'type', 'from', 'to']:
            if entry not in notification.keys():
                error = '{} field in notification is required'.format(entry)
                return errorResponse(error)

        next_nid = redis_client.get('next_nid')
        redis_client.incr('next_nid')
        redis_client.hmset("notif{}".format(next_nid), {'from': notification['from'], 'to': notification['to'], 'msg': notification['msg'], 'createdDate': notification['createdDate'], 'type': notification['type']})
        redis_client.rpush("notifications{}".format(toUid), next_nid)
        return jsonResponse()
    return jsonResponse()
