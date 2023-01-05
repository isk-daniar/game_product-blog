from django.db import models

class GPUserConf(models.Model):
    name = models.CharField(max_length=50)
    e_mail = models.CharField(max_length=100)
    e_mail_conf = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    password_conf = models.CharField(max_length=50)