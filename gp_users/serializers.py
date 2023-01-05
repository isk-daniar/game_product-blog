from rest_framework import serializers
from .models import GPUserConf


class GPUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPUserConf
        fields = ('name', 'e_mail', 'e_mail_conf', 'password', 'password_conf')