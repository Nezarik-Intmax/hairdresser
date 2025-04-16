from django.urls import path, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from . import views


# Метаданные Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="Парикмахерская API",
      default_version='v1',
      description="API",
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)
urlpatterns = [
	path('clients', views.GetAllClients.as_view()),
	path('clients/<str:phone>', views.GetDeleteByPhoneClient.as_view()),
	path('services', views.GetAllServices.as_view()),
	path('masters', views.GetAllMasters.as_view()),
	path('appointments', views.GetAllAppointments.as_view()),
	path('appointments/<str:master_id>', views.GetDeleteByMasterAppointments.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]

