from django.template.response import TemplateResponse
from django.http import HttpResponse, JsonResponse


def load_customer_page(request):
    if request.method == 'GET':
        return TemplateResponse(request, 'customer.html')


def load_main_page(request):
    if request.method == 'GET':
        return TemplateResponse(request, 'main-page.html')


def customer(request):
    if request.method == 'PUT':
        print(request.POST)
        return HttpResponse()

    if request.method == 'POST':
        print(request.POST)
        return JsonResponse({
            'status': 'success',
            'message': 'Customer created successfully'
        })

    if request.method == 'DELETE':
        print(request.POST)
        return HttpResponse()

    if request.method == 'GET':
        # if not request.GET.get('identify'):
        #     return JsonResponse({
        #         'status': 'error',
        #         'message': 'Não há identificador para o cliente'
        #     })
        return JsonResponse({
            'status': 'success',
            'customers': {'1': {
                    'name': 'John Doe',
                    'email': 'johndoe@gmail.com',
                    'phone': '123456789',
                    'cpf': '123456789',
                    'birth_date': '01/01/2000',
                    'postal_code': '21810-000',
                    'address': 'Rua Antonio Cerazio, 111',
                    'city': 'Rio de Janeiro',
                    'state': 'Rio de Janeiro'
                },
                '2': {
                    'name': 'John Doe2',
                    'email': 'johndoe2@gmail.com',
                    'phone': '1234567892',
                    'cpf': '1234567892',
                    'birth_date': '01/01/2000',
                    'postal_code': '21810-000',
                    'address': 'Rua Antonio Cerazio, 111',
                    'city': 'Rio de Janeiro',
                    'state': 'Rio de Janeiro'
                }
            }
        })
