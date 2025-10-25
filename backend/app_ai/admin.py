from django.contrib import admin, messages
from django.utils.html import format_html
from app_ai.models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'gender', 'age', 'show_password', 'create_time')
    search_fields = ('username', 'email')
    list_filter = ('gender',)
    readonly_fields = ('password', 'create_time', 'update_time')
    fieldsets = (
        ('基本信息', {
            'fields': (
                'username', 'email', 'avatar',
                'age', 'gender', 'height', 'weight',
                'password',
            )
        }),
        ('时间信息', {
            'fields': ('create_time', 'update_time'),
        }),
    )

    def show_password(self, obj):
        return "********" if obj.password else "(未设置)"
    show_password.short_description = "密码"

    @admin.action(description='重置选中用户的密码为 123456')
    def reset_password(self, request, queryset):
        for user in queryset:
            user.password = '123456'
            user.save()
        messages.success(request, "已将选中用户的密码重置为 123456")

    actions = [reset_password]

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        user = self.get_object(request, object_id)
        if user:
            reset_url = f"../?action=reset_password&ids={user.id}"
            extra_context['custom_button'] = format_html(
                f'<a class="button" href="{reset_url}" '
                f'style="background:#1677ff;color:white;padding:6px 12px;'
                f'border-radius:4px;text-decoration:none;">重置该用户密码</a>'
            )
        return super().change_view(request, object_id, form_url, extra_context=extra_context)
