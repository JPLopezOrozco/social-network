# Generated by Django 5.0.7 on 2024-08-05 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_posts_likes_replies'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='media',
        ),
        migrations.AddField(
            model_name='posts',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='posts_images/'),
        ),
        migrations.AlterField(
            model_name='group',
            name='image',
            field=models.ImageField(blank=True, default='groups_images/group_default.jpeg', upload_to='groups_images'),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, default='user_images/profile_default.png', upload_to='user_images'),
        ),
    ]
