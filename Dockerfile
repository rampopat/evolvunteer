FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY gamma_backend/requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/


# Setup nodeJS
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install nodejs

# Build node app
WORKDIR /code/gamma_frontend/
RUN npm install
RUN npm run-script build

WORKDIR /code
EXPOSE 5000
CMD ./launch.sh
