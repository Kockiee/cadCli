from datetime import datetime
from itertools import product
from typing import List
import databases
import sqlalchemy
from sqlalchemy import sql, Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.sql.expression import delete, select, update
from pydantic import BaseModel
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import requests

DATABASE_URL = "sqlite:///./test.db"

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

#Criação da tabela usuário
users = sqlalchemy.Table(
    "usuario",
    metadata,
    sqlalchemy.Column("id_usuario", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("nome_usuario", sqlalchemy.String),
    sqlalchemy.Column("senha", sqlalchemy.String),
)

#Criação da tabela produtos
produtos = sqlalchemy.Table(
    "produtos",
    metadata,
    sqlalchemy.Column("id_produto", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("descricao_produto", sqlalchemy.String),
    sqlalchemy.Column("quantidade_em_estoque", sqlalchemy.String),
    sqlalchemy.Column("valor_unitario", sqlalchemy.Float),
    sqlalchemy.Column("dia_de_entrada_em_estoque", sqlalchemy.DateTime),
    sqlalchemy.Column("marca", sqlalchemy.String)
)

engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)

#Tabela usuario
class UserIn(BaseModel):
    nome_usuario: str
    senha: str

class User(BaseModel):
    id_usuario: int
    nome_usuario: str
    senha: str
#__________________________________________

# Tabela produtos
class ProductIn(BaseModel):
    descricao_produto: str
    quantidade_em_estoque: int
    valor_unitario: float
    dia_de_entrada_em_estoque: datetime
    marca: str

class Product(BaseModel):
    id_produto: int
    descricao_produto: str
    quantidade_em_estoque: int
    valor_unitario: float
    dia_de_entrada_em_estoque: datetime
    marca: str
#__________________________________________

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/img", StaticFiles(directory="img"), name="img")
app.mount("/js", StaticFiles(directory="js"), name="js")
templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

#Tabela usuario
@app.get("/allusers/", response_model=List[User])
async def read_notes():
    query = users.select() 
    return await database.fetch_all(query)

@app.get("/oneuser/", response_model=List[User])
async def read_note(id: int):
    query = select(users).where(users.c.id_usuario == id)
    return await database.fetch_all(query)

@app.post("/insertuser/", response_model=User)
async def create_user(user: UserIn):
    query = users.insert().values(nome_usuario=user.nome_usuario, senha=user.senha)
    last_record_id = await database.execute(query)
    return {**user.dict(), "id_usuario": last_record_id}

@app.get("/deleteuser/")
async def read_user(id: int):
    query = delete(users).where(users.c.id_usuario == id)
    await database.execute(query)
    return {"resultado":"Registro deletado"}

@app.get("/updateuser/")
async def read_note(nu: str, senha: str):
    query = update(users).values(senha = senha).where(users.c.nome_usuario == nu)
    await database.execute(query)
    return {"resultado":"Registro atualizado"}
#____________________________________________________________________________________

#Tabela produtos
@app.get("/allproducts/", response_model=List[Product])
async def read_notes():
    query = produtos.select() 
    return await database.fetch_all(query)

@app.get("/oneproduct/", response_model=List[Product])
async def read_note(id_produto: int):
    query = select(produtos).where(produtos.c.id_produto == id_produto)
    return await database.fetch_all(query)


@app.post("/insertproduct/", response_model=Product)
async def create_user(pro: ProductIn):
    query = produtos.insert().values(descricao_produto=pro.descricao_produto, quantidade_em_estoque=pro.quantidade_em_estoque, valor_unitario=pro.valor_unitario, dia_de_entrada_em_estoque=pro.dia_de_entrada_em_estoque, marca=pro.marca)
    last_record_id = await database.execute(query)
    return {**pro.dict(), "id_produto": last_record_id}

@app.get("/deleteproduct/")
async def read_product(id_produto: int):
    query = delete(produtos).where(produtos.c.id_produto == id_produto)
    await database.execute(query)
    return {"resultado":"Registro deletado"}

@app.get("/updateproduct/")
async def read_note(id_produto: str, descricao_produto: str, quantidade_em_estoque: int, valor_unitario: float):
    query = update(produtos).values(descricao_produto = descricao_produto, quantidade_em_estoque = quantidade_em_estoque, valor_unitario = valor_unitario).where(produtos.c.id_produto == id_produto)
    await database.execute(query)
    return {"resultado":"Registro atualizado"}

#____________________________________________________________________________________