from pydantic import BaseModel, constr


class UserLoginSchema(BaseModel):
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=6)