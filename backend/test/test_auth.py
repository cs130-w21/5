import pytest
from flask import Flask
from auth import *


# For now, this is an initial test for travis
def test_register(client, app):
    url = 'api/auth/register'
    data = {'fname':'joe', 'lname':'bruin', 'email':'joebruin@gmail.com', 'password':'goBru1ns', 'isTutor':'false'}
    response = client.post(url, data=data)
    assert response.status_code == 302