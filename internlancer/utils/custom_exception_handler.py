from rest_framework.views import exception_handler


def custom_exception_handler(exec, context):

    response = exception_handler(exec, context)
    exception_class = exec.__class__.__name__
    print(exception_class)

    if exception_class == 'AuthenticationFailed':
        response.data = {
            "error": "Invalid Email or Password"
        }

    if exception_class == 'NotAuthenticated':
        response.data = {
            "error": "Please Login to Access This Resource"
        }
    if exception_class == "InvalidToken":
        response.data = {
            "error": "Your Authentication Token is Expired, Please Login Again."
        }
    return response
