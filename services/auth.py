from django.http import JsonResponse


def auth_user(username, password):
    return JsonResponse({
        'username': username,
        'password': password
    })
