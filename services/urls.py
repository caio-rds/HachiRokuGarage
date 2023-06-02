from django.urls import path
from .externals import cep
from .auth import auth_user


app_name = 'services'

urlpatterns = [
    path('cep/', cep, name='cep'),
    path('login/', auth_user, name='login')
]