from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=20, unique=True,verbose_name="用户名")
    password = models.CharField(max_length=128, null=True,verbose_name="密码")
    email = models.EmailField(unique=True,verbose_name="邮箱")
    avatar = models.CharField(max_length=200,verbose_name="用户头像")
    age = models.CharField(max_length=20,verbose_name="年龄")
    gender = models.CharField(max_length=10,verbose_name="性别")
    height = models.CharField(max_length=10,verbose_name="身高")
    weight = models.CharField(max_length=10,verbose_name="体重")
    create_time = models.DateTimeField(auto_now_add=True,verbose_name="创建时间")
    update_time = models.DateTimeField(auto_now_add=True,verbose_name="创建时间")
    def __str__(self):
        return self.username
    class Meta:
        db_table = 'user'
