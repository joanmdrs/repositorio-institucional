from rest_framework.routers import DefaultRouter
from .views import ArquivoViewSet

router = DefaultRouter()
router.register(r"arquivo", ArquivoViewSet, basename="arquivo")

urlpatterns = router.urls
