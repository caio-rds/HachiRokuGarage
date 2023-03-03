import json


def zip_code(code: str) -> dict:
    code = code.replace('-', '')
    if len(code) != 8:
        return {'error': 'Código postal inválido'}
