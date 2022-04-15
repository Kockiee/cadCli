FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
RUN pip install requests
RUN pip install python-multipart
RUN pip install aiofiles
RUN pip install jinja2
RUN pip install databases
RUN pip install aiosqlite
COPY ./app /app