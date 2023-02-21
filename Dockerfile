FROM python:3.10

WORKDIR /code
EXPOSE 8000

RUN pip install --upgrade pip
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache --upgrade -r /code/requirements.txt

COPY . /code


