import requests
from django.http import JsonResponse


def cep(request) -> JsonResponse:
    current_cep = request.GET.get('cep').replace('-', '')
    url = f'https://viacep.com.br/ws/{current_cep}/json/'
    response = requests.get(url)
    if response.status_code == 200:
        resp = response.json()
        return JsonResponse({
            'status': 'success',
            'content': {
                'address': resp.get('logradouro'),
                'city': resp.get('localidade'),
                'state': resp.get('uf'),
            }
        })
    return JsonResponse({'status': 'error', 'message': 'CEP não encontrado'}, status=200)
