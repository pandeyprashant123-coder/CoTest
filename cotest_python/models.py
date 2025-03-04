from pydantic import BaseModel


class CodeInput(BaseModel):
    code: str


class CodeError(BaseModel):
    message: str
    severity: int
    line: int
    endline: int
    column: int = 0


class ReviewResponse(BaseModel):
    errors: list[CodeError]
    total_eloc: int
