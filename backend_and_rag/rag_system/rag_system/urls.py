from django.contrib import admin
from django.urls import path
from rag_app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.health),
    path("api/index/", views.index),
    path("api/ask/", views.ask),
]
