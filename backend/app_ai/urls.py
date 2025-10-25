from django.urls import path
from . import views

app_name = 'app_ai'

urlpatterns = [
    # 在这里添加你的URL模式
    # path('', views.index, name='index'),
    path('csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
]