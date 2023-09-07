from functools import wraps
import jwt
from flask import request, abort
from flask import current_app


def token_required(data):

    print(request.headers.get('x-access-token'))
    token=request.headers.get('x-access-token')
    if not token:
        return {
                    "message": "Authentication Token is missing!",
                    "data": None,
                    "error": "Unauthorized"
        }
        
    else:
        try:
            data=jwt.decode(token, "SECRET_KEY", algorithms=["HS256"])
            print(data)
            if not data:
                print('data')
                return  False
            else:
                print('data else')
                return True    
        except Exception as e:
            print('data e')
            return False       


    return 'decorated'