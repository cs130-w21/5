import json


# Testing the register() api
def test_register(client, app):
    url = 'api/auth/register'
    json_data = {
        "firstName": "joe" ,
        "lastName": "bruin",
        "email": "joebruin@gmail.com",
        "password": "goBru1ns",
        "isTutor": False
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json
    assert not response_json['error']

    response = client.post(url, data=None)
    assert response.status_code == 400

# Testing the login() api
def test_login(client, app):
    test_register(client, app)
    url = 'api/auth/login'
    json_data = {
        "email": "joebruin@gmail.com",
        "password": "goBru1ns"
    }

    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json
    assert not response_json['error']

    response = client.post(url, data=None)
    assert response.status_code == 400

def test_forgot(client, app):
    url = 'api/recovery/forgot'
    json_data = {
        "email": "joebruin@gmail.com"
    }

    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200

    response = client.post(url, data=None)
    assert response.json['error']

def test_logout(client, app):
    url = 'api/auth/logout'
    response = client.get(url)
    assert response.status_code == 200
