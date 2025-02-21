from pydantic import BaseModel


class CodeInput(BaseModel):
    code: str


class CodeError(BaseModel):
    message: str
    severity: int
    line: int
    endline: int
