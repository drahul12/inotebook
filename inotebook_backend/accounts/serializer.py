from rest_framework import serializers
from accounts.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError
from accounts.mail_sender import MailSender

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    # we created password2 for validation & its not in User model
    class Meta:
        model = User
        fields = ['email', 'name', 'tc', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        print("in validate")
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("password do not match with confirm password")
        return attrs
    
    def create(self, validate_data):
        print("in create")
        return User.objects.create_user(**validate_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255) 
    # we don't want model email as unique will raise error as mail is already exist
    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,
                                     style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255,
                                      style={'input_type':'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("password do not match with confirm password")
        user.set_password(password)
        user.save()
        return attrs
    
class SendPasswordResetLinkSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print(uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print("Password reset token ", token)
            link= "http://localhost:3000/api/user/reset/{uid}/{token}/".format(uid=uid, token=token)
            print("Password Reset Link", link)
            MailSender.send_email({"subject":"Reset Password Link",
                                   "body":"{link}".format(link=link),
                                    "to":user.email})
            return attrs
        else:
            raise ValidationError("User is not registered with us")

class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,
                                     style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255,
                                      style={'input_type':'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']
    
    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            
            if password != password2:
                raise serializers.ValidationError("password do not match with confirm password")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationError("Token is not Valid or Expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as e:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationError("Token is not Valid or Expired")