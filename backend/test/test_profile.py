import json


# Testing the register() api
def test_edit(client, app):
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
    url = 'api/profile/edit'
    json_data = {
        "firstName": "j" ,
        "lastName": "b",
        "major": "CS",
        "year": 2021,
        "classes": ["CS 130", "CS 181"],
        "uid": "1"
    }
    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json
    assert not response_json['error']

    response = client.post(url, data=None)
    assert response.status_code == 400

# Testing the login() api
def test_get(client, app):
    test_edit(client, app)
    url = 'api/profile/get'
    json_data = {
        "uid": "1"
    }

    data = json.dumps(json_data)
    response = client.post(url, data=data)
    assert response.status_code == 200
    response_json = response.json
    assert not response_json['error']
    assert response_json['firstName'] == "j"
    assert response_json['lastName'] == "b"
    assert response_json['year'] == "2021"
    assert response_json['major'] == "CS"
    assert response_json['classes'] == ["CS 130", "CS 181"]

    response = client.post(url, data=None)
    assert response.status_code == 400
