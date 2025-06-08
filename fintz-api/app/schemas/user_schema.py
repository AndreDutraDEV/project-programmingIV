from pydantic import BaseModel, EmailStr, constr
from marshmallow import Schema, fields, validate

class UserLoginSchema(BaseModel):
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=6)

class UserRegisterSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=2))
    email = fields.Email(required=True)
    cell = fields.Str(required=False)
    password = fields.Str(required=True, validate=validate.Length(min=6))