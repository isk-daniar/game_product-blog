# Generated by Django 4.0.5 on 2022-12-27 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_expandpost_postblog'),
    ]

    operations = [
        migrations.AddField(
            model_name='expandpost',
            name='image',
            field=models.ImageField(blank=True, upload_to='blog/images/'),
        ),
        migrations.AddField(
            model_name='postblog',
            name='slug',
            field=models.SlugField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='postblog',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]