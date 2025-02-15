from pydantic import BaseModel


class CodeError(BaseModel):
    message: str
    severity: int
    line: int
    endline: int
