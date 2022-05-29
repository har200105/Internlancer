from rest_framework.views import exception_handler


def custom_exception_handler(exec, context):
    print("Got error")
    response = exception_handler(exec, context)
    exception_class = exec.__class__.__name__
    print(exception_class)

    if exception_class == 'AuthenticationFailed':
        response.data = {
            "error": "Invalid Email or Password"
        }
        print(response.data)

    if exception_class == 'NotAuthenticated':
        response.data = {
            "error": "Please Login to Access This Resource"
        }
        print(response.data)
    if exception_class == "InvalidToken":
        response.data = {
            "error": "Your Authentication Token is Expired, Please Login Again."
        }
        print(response.data)
    return response
