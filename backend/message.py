import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash

import json

bp = Blueprint('message', __name__, url_prefix='/api/message')

@bp.route('/add', methods=('GET', 'POST'))
def add():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        fromUid = data['from'] if data else None
        toUid = data['to'] if data else None
        msg = data['msg'] if data else None
        createdDate = data['createdDate'] if data else None
        error = None

        if not fromUid:
            error = 'From UID is required.'
        elif not toUid:
            error = 'To UID is required.'
        elif not hostUid:
            error = 'Host UID is required'
        elif msg is None:
            error = 'Message is required'
        elif not createdDate:
            error = 'Created Date is required.'

        if error is None:
            next_mid = redis_client.get('next_mid')
            redis_client.incr('next_mid')
            redis_client.hmset("msg{}".format(next_mid), {'from': fromUid, 'to': toUid, 'msg': msg, 'createdDate': createdDate})
            next_nid = redis_client.get('next_nid')
            redis_client.incr('next_nid')
            redis_client.hmset("notif{}".format(next_nid), {'from': fromUid, 'to': toUid, 'msg': msg, 'createdDate': createdDate, 'type': "MESSAGE"})
            redis_client.rpush("notifications{}".format(toUid), next_nid)

            return json.dumps({'error': False}), 200, {'Content-Type':'application/json'}

        return json.dumps({'error': True, 'errMsg': error}), 200, {'Content-Type':'application/json'}
    return '', 200

@bp.route('/get', methods=('GET', 'POST'))
def get():
    redis_client = current_app.config['RDSCXN']
    if request.method == 'POST':
        data = request.get_json()
        hostUid = data['host']
        fromUid = data['from'] if 'from' in data.keys() else None
        toUid = data['to'] if 'to' in data.keys() else None
        error = None

        if not hostUid:
            error = 'Host UID is required'

        if error is None:
            messageIds = redis_client.lrange("messages{}".format(hostUid), 0, -1)
            messages = []
            for mid in messageIds:
                message = redis_client.hgetall("msg{}".format(mid))
                if (not fromUid or fromUid == message['from']) and (not toUid or toUid == message['to']):
                    messages.append(message)
                return json.dumps({'error': False, 'messages': messages}), 200, {'Content-Type': 'application/json'}

        return json.dumps({'error': True, 'errMsg': error}), 200, {'Content-Type':'application/json'}
    return '', 200
