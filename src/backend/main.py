from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os


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


frontend_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "frontend")
)
app.mount("/static", StaticFiles(directory=frontend_path), name="static")


@app.get("/")
def read_index():
    index_path = os.path.join(frontend_path, "index.html")
    return FileResponse(index_path)


@app.post("/course", status_code=200)
def add_course(course: Course):
    courses.append(course.name)
    return course.name


@app.get("/course", status_code=200)
def getCourses():
    return {"data": courses}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
