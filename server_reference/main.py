"""
Эталонный Strawberry-сервер (тема 2.2 + CORS из темы 1.2).
Используйте СВОЙ сервер; этот файл нужен как ориентир по схеме и CORS.

Запуск:  pip install fastapi uvicorn strawberry-graphql
         uvicorn main:app --reload
"""
from typing import Optional
import strawberry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter


@strawberry.type
class Category:
    id: int
    name: str


@strawberry.type
class Task:
    id: int
    title: str
    done: bool
    category: Optional[Category]


CATEGORIES = [Category(id=1, name="Учёба"), Category(id=2, name="Работа")]
TASKS = [
    Task(id=1, title="Изучить Apollo Client", done=False, category=CATEGORIES[0]),
    Task(id=2, title="Настроить CORS", done=True, category=CATEGORIES[1]),
]


@strawberry.type
class Query:
    @strawberry.field
    def all_tasks(self) -> list[Task]:
        return TASKS


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, title: str) -> Task:
        task = Task(id=max((t.id for t in TASKS), default=0) + 1,
                    title=title, done=False, category=CATEGORIES[0])
        TASKS.append(task)
        return task

    @strawberry.mutation
    def complete_task(self, id: int) -> Optional[Task]:
        for t in TASKS:
            if t.id == id:
                t.done = True
                return t
        return None


schema = strawberry.Schema(query=Query, mutation=Mutation)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # origin React-приложения
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(GraphQLRouter(schema), prefix="/graphql")
