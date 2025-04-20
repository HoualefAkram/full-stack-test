from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from fastapi import HTTPException


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Houalef akram"}


@app.post("/login", status_code=200)
async def login(username: str, password: str):
    conn = psycopg2.connect(
        user="postgres", password="admin", database="backend", host="127.0.0.1"
    )
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM users WHERE username = %s AND password = %s",
        (username, password),
    )
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    query = "SELECT * FROM users WHERE username = $1 AND password = $2"
    result = await conn.fetchrow(query, username, password)

    await conn.close()

    if result:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
