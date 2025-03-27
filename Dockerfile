FROM python:3.8

WORKDIR /app/cotest_python

COPY cotest_python/requirements.txt .

RUN pip install -r cotest_python/requirements.txt

COPY . .

EXPOSE 8001

CMD [ "python","-m","cotest_python.api" ]