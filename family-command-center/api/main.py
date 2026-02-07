from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import database as db

app = FastAPI(title="Family Command Center API")

# Enable CORS for the static HTML frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
db.init_db()

# Models
class TodoCreate(BaseModel):
    text: str
    category: str = "general"

class TodoResponse(BaseModel):
    id: int
    text: str
    category: str
    done: int
    created_at: str
    completed_at: Optional[str]

class NoteCreate(BaseModel):
    text: str
    author: str = "Zhia"

class NoteResponse(BaseModel):
    id: int
    text: str
    author: str
    created_at: str

# Todo endpoints
@app.get("/api/todos")
def get_todos(category: Optional[str] = None):
    return db.get_todos(category)

@app.post("/api/todos")
def create_todo(todo: TodoCreate):
    todo_id = db.add_todo(todo.text, todo.category)
    return {"id": todo_id, "message": "Todo created"}

@app.post("/api/todos/{todo_id}/toggle")
def toggle_todo(todo_id: int):
    new_status = db.toggle_todo(todo_id)
    if new_status is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"id": todo_id, "done": new_status}

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: int):
    db.delete_todo(todo_id)
    return {"message": "Todo deleted"}

# Note endpoints
@app.get("/api/notes")
def get_notes(limit: int = 10):
    return db.get_notes(limit)

@app.post("/api/notes")
def create_note(note: NoteCreate):
    note_id = db.add_note(note.text, note.author)
    return {"id": note_id, "message": "Note created"}

@app.delete("/api/notes/{note_id}")
def delete_note(note_id: int):
    db.delete_note(note_id)
    return {"message": "Note deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8092)
