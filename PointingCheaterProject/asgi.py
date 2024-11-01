import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from PointingCheaterAPI import urls

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PointingCheaterProject.settings')

# application = get_asgi_application()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # "websocket": AllowedHostsOriginValidator(
    #         URLRouter(
    #             urls.websocket_urlpatterns
    #         )
    #     ),
})