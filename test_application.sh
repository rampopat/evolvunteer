#!/bin/bash

export WORKSPACE=`pwd`

virtualenv -p python3 myenv
source myenv/bin/activate

cd gamma_backend
pip3 install -r requirements.txt
python3 manage.py test
if [ "$?" = "0" ]; then
    printf "[TEST] - success\n"
else
    printf "[TEST] - failure\n"
    exit 1
fi
