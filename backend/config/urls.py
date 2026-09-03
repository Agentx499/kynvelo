from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({
        'status': 'healthy',
        'service': 'kynvelo-backend-monolith',
        'modules': ['pulse', 'flow', 'pay', 'coach', 'fuel'],
        'dpdp_compliant': True
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health-check'),
]
