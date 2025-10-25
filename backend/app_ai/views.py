from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
# Create your views here.
import logging
from app_ai.models import User


@ensure_csrf_cookie
def get_csrf_token(request):
    """获取CSRF Token"""
    return JsonResponse({'csrfToken': get_token(request)})


@csrf_exempt  # 临时禁用 CSRF 验证，用于调试
@require_http_methods(['POST'])
def login(request):
    if request.method == "POST":
        # 调试信息
        logging.info(f"Cookies: {request.COOKIES}")
        logging.info(f"CSRF Token from request: {request.META.get('HTTP_X_CSRFTOKEN')}")
        logging.info(f"CSRF Cookie: {request.COOKIES.get('csrftoken')}")
        
        username = request.POST.get('username')
        password = request.POST.get('password')
        logging.info(f"username:{username}, password:{password}")
        if not username or not password:
            return JsonResponse({'status': 'fail', 'msg': '用户名或密码不能为空'})

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'status': 'fail', 'msg': '用户不存在'})

        if check_password(password, user.password):
            return JsonResponse({'status': 'ok', 'msg': '登录成功'})
        else:
            return JsonResponse({'status': 'fail', 'msg': '密码错误'})

    return JsonResponse({'status': 'fail', 'msg': '请求方式错误'})

@csrf_exempt  # 临时禁用 CSRF 验证，用于调试
@require_http_methods(['POST'])
def register(request):
    if request.method == "POST":
        # 调试信息
        logging.info(f"Cookies: {request.COOKIES}")
        logging.info(f"CSRF Token from request: {request.META.get('HTTP_X_CSRFTOKEN')}")
        logging.info(f"CSRF Cookie: {request.COOKIES.get('csrftoken')}")
        
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        age = request.POST.get('age')
        gender = request.POST.get('gender')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        logging.info(f"username:{username}, password:{password}")
        if not username or not password:
            return JsonResponse({'status': 'fail',"msg":'用户名和密码不能为空'})

        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': 'fail',"msg":'用户名已经存在了，请切换一个'})
        try:
            User.objects.create(username=username,
                                password=make_password(password),
                                email=email,
                                age=age,
                                gender=gender,
                                height=height,
                                weight=weight)
            return JsonResponse({'status': 'ok'})
        except Exception as e:
            logging.error(f"注册时发生错误: {e}")
            return JsonResponse({'status': 'fail', "msg": '注册失败，请稍后再试'})
    return JsonResponse({'status': 'fail', "msg": '请求方式错误'})

