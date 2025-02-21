import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cotest_python.models import CodeInput
from cotest_python.reviewer import Reviewer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/review_python_code")
def review_code(data: CodeInput):
    reviewer = Reviewer()
    errors = reviewer.review(data.code)
    return errors


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
