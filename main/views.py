from django.shortcuts import render
from django.http import HttpResponse

from main.models import Product, Category


# Create your views here.
def index(request):
    """print(dir(Category.objects.first().products.all))
    print(Category.objects.first())
    print(Category.objects.first().products.all())
    products = Product.objects.all()
    print(products)"""
    print(Product.objects.first().image)
    print(Product.objects.first().image)
    context = {
        'categories': Category.objects.all(),
    }
    return render(request, 'index.html', context)
