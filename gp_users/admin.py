from django.contrib import admin
from . import models


@admin.register(models.GPUserConf)
class GPUSerAdmin(admin.ModelAdmin):
    list_display = ['name', 'e_mail', 'e_mail_conf', 'password', 'password_conf']
