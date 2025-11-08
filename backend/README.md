# running fastapi

pip install -r requirements.txt

running as dev -> fastapi dev api/main.py

I think the more better way to run it though is with below command:

uvicorn api.main:app --reload

served on localhost:8000

can view openapi schema at localhost:8000/docs