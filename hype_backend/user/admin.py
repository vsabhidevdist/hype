from django.contrib import admin
from .models import user,follow,block,stream
# Register your models here.
admin.site.register(user)
admin.site.register(follow)
admin.site.register(block)
admin.site.register(stream)

