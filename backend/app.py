"""
app.py
Entrypoint for Bruintutor backend. All API endpoints start with /api
"""

import os
import auth, profile, class_list, recovery, match, message, search, schedule, notification
from flask import Flask
import rdscli

try:
    rdscli.connect()
except:
    pass

def create_app(test_config=None):
    """
    Create and configure the app.

    Parameters
    ----
    test_config
        configuration file for the app
    """
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # CORS(app, supports_credentials = True)
    try:
        if rdscli.r.get('next_uid') == None:
            rdscli.r.set('next_uid', 1)
        if rdscli.r.get('next_mid') == None:
            rdscli.r.set('next_mid', 1)
        if rdscli.r.get('next_nid') == None:
            rdscli.r.set('next_nid', 1)
        rdscli.r.bgsave()
    except:
        pass
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        RDSCXN = rdscli.r,
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(auth.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(class_list.bp)
    app.register_blueprint(message.bp)
    app.register_blueprint(recovery.bp)
    app.register_blueprint(match.bp)
    app.register_blueprint(schedule.bp)
    app.register_blueprint(search.bp)
    app.register_blueprint(notification.bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run()
