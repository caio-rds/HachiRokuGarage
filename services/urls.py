from django.urls import path
from .externals import cep

app_name = 'services'

urlpatterns = [
    path('cep/', cep, name='cep')
]