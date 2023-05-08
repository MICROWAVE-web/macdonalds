from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

from main.views import index

urlpatterns = [
    path('', index)
]
