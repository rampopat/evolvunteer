#!/bin/bash

cd gamma_backend
pip install -r requirements.txt
gunicorn gamma_api.wsgi
