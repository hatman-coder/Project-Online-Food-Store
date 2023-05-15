from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import UserProfile, ExpiredToken
import jwt
import datetime

class UserAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise AuthenticationFailed('No token provided')

        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired')
        except:
            raise AuthenticationFailed('Invalid token')

        # Check if the token exists in the ExpiredToken model
        if ExpiredToken.objects.filter(token=token).exists():
            raise AuthenticationFailed('Token has already been used')

        user = UserProfile.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('User not found')

        return (user, None)

    def get_user(self, user_id):
        try:
            return UserProfile.objects.get(pk=user_id)
        except UserProfile.DoesNotExist:
            return None
