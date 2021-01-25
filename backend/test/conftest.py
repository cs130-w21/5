import os

import pytest
import fakeredis
from flask import Flask
import auth, profile


@pytest.fixture
def app():
    app = Flask(__name__, instance_relative_config=True)

    server = fakeredis.FakeServer()
    fr = fakeredis.FakeStrictRedis(server=server)
    app.config.from_mapping(
            RDSCXN = fr
    )

    app.register_blueprint(auth.bp)
    app.register_blueprint(profile.bp)

    return app

@pytest.fixture
def client(app):
    return app.test_client()

