import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

from cotest_python.reviewer import Reviewer

app = FastAPI()


@app.get("/")
def index():
    return {"name": "Yashwan"}


class CodeInput(BaseModel):
    code: str


@app.post("/review_python_code/")
def review_code(data: CodeInput):
    reviewer = Reviewer()
    errors = reviewer.review(data.code)
    return errors


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
