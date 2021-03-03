import json

def create_user(uid, fname, lname, major, classes, redis_client, isTutor):
    redis_client.hset("user{}".format(uid), key="fname", value=fname)
    redis_client.hset("user{}".format(uid), key="lname", value=lname)
    redis_client.hset("user{}".format(uid), key="major", value=major)
    redis_client.hset("user{}".format(uid), key="isTutor", value=isTutor)

    redis_client.delete("classes{}".format(uid))
    for c in classes:
        redis_client.rpush("classes{}".format(uid), c)

def test_search(client, app):
    redis_client = app.config['RDSCXN']
    url = 'api/search/get'

    create_user(1, 'John', 'Doe', 'Computer Science', ['CS 180', 'CS 111'], redis_client, '1')
    create_user(2, 'Jill', 'Doe', 'Biology', ['Bio 121', 'Bio 35', 'Bio 173'], redis_client, '1')
    create_user(3, 'JDoNot', 'Show', 'Biology', ['Bio 35', 'CS 111'], redis_client, '0')
    search_result({'name': 'J'}, [1, 2], client, url)
    search_result({'name': 'Jo'}, [1], client, url)
    search_result({'name': 'Ji', 'class': ['CS 180']}, [], client, url)
    search_result({'name': 'hn Do'}, [1], client, url)
    search_result({'major': 'Biology'}, [2], client, url)
    search_result({'name': 'Jill Doe', 'major': 'Biology', 'class': ['Bio 35']}, [2], client, url)
    search_result({'name': 'J', 'class': ['Bio 35', 'CS 111']}, [1, 2], client, url)


def search_result(values, expected, client, url):
    search1 = json.dumps(values)
    search1_response = client.get(url, headers={'Content-Type': 'application/json'}, data=search1)
    search1_response_json = search1_response.json
    assert search1_response.status_code == 200
    assert not search1_response_json['error']
    assert search1_response_json['payload'] == expected
