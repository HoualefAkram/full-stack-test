from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Course(BaseModel):
    name: str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


courses: list = []


@app.get("/")
async def root():
    return {"message": "Houalef akram"}


@app.post("/course", status_code=200)
def add_course(course: Course):
    courses.append(course.name)
    return course.name


@app.get("/course", status_code=200)
def getCourses():
    return {"data": courses}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
