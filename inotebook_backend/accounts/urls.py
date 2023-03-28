
from django.urls import path, include
from accounts.views import UserRegistrationView, UserLoginView, \
UserProfileView, UserChangePasswordView, SendPasswordResetLinkView, UserPasswordResetView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='user_change_password'),
    path('reset-password/', SendPasswordResetLinkView.as_view(), name='send_password_link'),
    path('reset/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset_password'),
]
