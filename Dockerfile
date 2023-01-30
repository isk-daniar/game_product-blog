FROM python:3.10

WORKDIR /code
EXPOSE 8000
COPY ./requirements.txt /code/requirements.txt

RUN pip instal --no-cache --upgrade -r /code/requirements.txt

COPY . /code


