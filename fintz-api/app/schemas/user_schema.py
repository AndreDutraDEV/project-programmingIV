from pydantic import BaseModel, EmailStr, constr

class UserLoginSchema(BaseModel):
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=6)

class UserRegisterSchema(BaseModel):
    name: constr(min_length=2, max_length=100)
    email: EmailStr
    cell: constr(min_length=8, max_length=20)