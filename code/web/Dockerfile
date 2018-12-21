FROM python:3.6
ENV PYTHONUNBUFFERED 1

RUN \
  apt-get -y update && \
  apt-get install -y gettext && \
  apt-get clean

ADD requirements.pip /app/
RUN pip install -r /app/requirements.pip

ADD . /app
WORKDIR /app

EXPOSE 8000
ENV PORT 8000

CMD ["uwsgi", "/app/air_canteen/wsgi/uwsgi.ini"]
