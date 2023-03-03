
from django.shortcuts import render, redirect


def main_page(request):
    return render(request, 'main-page.html')


def select_main(request):
    print('select_main')
    return render(request, 'main-page.html')


