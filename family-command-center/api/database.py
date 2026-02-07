import sqlite3
import json
from datetime import datetime
from pathlib import Path

DB_PATH = Path(__file__).parent / "family.db"

def init_db():
    """Initialize database with tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Todos table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            category TEXT DEFAULT 'general',
            done INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            completed_at TEXT
        )
    """)
    
    # Notes table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            author TEXT DEFAULT 'Zhia',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()

def get_todos(category=None):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if category:
        cursor.execute("SELECT * FROM todos WHERE category = ? ORDER BY created_at DESC", (category,))
    else:
        cursor.execute("SELECT * FROM todos ORDER BY created_at DESC")
    
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_todo(text, category='general'):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (text, category) VALUES (?, ?)", (text, category))
    conn.commit()
    todo_id = cursor.lastrowid
    conn.close()
    return todo_id

def toggle_todo(todo_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get current status
    cursor.execute("SELECT done FROM todos WHERE id = ?", (todo_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None
    
    new_status = 0 if row[0] else 1
    completed_at = datetime.now().isoformat() if new_status else None
    
    cursor.execute(
        "UPDATE todos SET done = ?, completed_at = ? WHERE id = ?",
        (new_status, completed_at, todo_id)
    )
    conn.commit()
    conn.close()
    return new_status

def delete_todo(todo_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    conn.commit()
    conn.close()

def get_notes(limit=10):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes ORDER BY created_at DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_note(text, author='Zhia'):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO notes (text, author) VALUES (?, ?)", (text, author))
    conn.commit()
    note_id = cursor.lastrowid
    conn.close()
    return note_id

def delete_note(note_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
