from django.urls import path
from core.views import customer as customer_view

app_name = 'customers'

urlpatterns = [
    path('main-page/', customer_view.load_main_page, name='load main page'),
    path('customers-page/', customer_view.load_customer_page, name='load Customer page'),
    path('customers/', customer_view.customer, name='crud')
]
