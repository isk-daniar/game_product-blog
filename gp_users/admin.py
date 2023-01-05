from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from . import models

@admin.register(models.GPUserConf)
class GPUSerAdmin(admin.ModelAdmin):
    list_display = ['name', 'e_mail', 'e_mail_conf', 'password', 'password_conf']

