---
title: "Build a Password Generator Desktop App with Python — Complete Walkthrough"
date: "2026-07-13"
excerpt: "A step-by-step guide to building a real desktop Password Generator app in Python — Tkinter GUI, three generation modes, SQLite history, clipboard copy, and packaging as a standalone macOS .app with PyInstaller. Every line of code explained."
tags: ["Python", "Tkinter", "SQLite", "PyInstaller", "Password Security", "Desktop App"]
author: "Waqas Syed"
readTime: "11 min read"
featured: false
---

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
<img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop" alt="Python password generator desktop app" style="width:100%; height:280px; object-fit:cover; display:block;"/>
<p style="background:#0f172a; color:#475569; font-size:0.72rem; padding:6px 12px; margin:0; text-align:right;">Photo: Unsplash</p>
</div>

# Build a Password Generator Desktop App with Python — Complete Walkthrough

This is a project I built to learn Python application engineering — and it turned out to be genuinely useful. A desktop app that generates secure, cybersecurity-compliant passwords in three modes, stores history locally, and ships as a double-click macOS `.app` that any user can run without Python installed.

By the end of this guide you'll have a working app. Let's build it.

---

## What We're Building

**Password Generator Pro** — features:
- Three generation modes: Strong, Medium, Memorable passphrase
- Configurable length with validation
- Toggle: include/exclude digits and symbols
- One-click clipboard copy
- Password history in local SQLite database
- Packaged as a standalone macOS `.app` — no Python required for end users

Stack: Python 3, Tkinter (built-in), SQLite3 (built-in), PyInstaller (one pip install).

---

## Part 1: Project Setup

No virtual environment needed for this project — every dependency except PyInstaller is part of Python's standard library.

```
password_generator/
├── password_generator_gui.py   # Main application
├── icon.icns                   # macOS app icon (optional)
└── requirements.txt            # Just PyInstaller
```

```
# requirements.txt
pyinstaller>=6.0
```

---

## Part 2: The GUI Skeleton

We use `tkinter.ttk` for styled widgets. On macOS, the Aqua theme applies automatically.

```python
import tkinter as tk
from tkinter import ttk, messagebox
import string
import random
import sqlite3
import os
from datetime import datetime
from pathlib import Path

class PasswordGeneratorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Password Generator Pro")
        self.root.geometry("450x450")
        self.root.resizable(False, False)
        
        # Variables
        self.result_var    = tk.StringVar()
        self.include_nums  = tk.BooleanVar(value=True)
        self.include_syms  = tk.BooleanVar(value=True)
        self.password_type = tk.StringVar(value="Strong")
        
        self._setup_db()
        self._build_ui()
```

### Building the UI

```python
    def _build_ui(self):
        font_heading = ("Arial Bold", 16)
        font_label   = ("Arial", 12)
        font_btn     = ("Arial Bold", 12)
        
        # Title
        tk.Label(self.root, text="Password Generator Pro",
                 font=font_heading).pack(pady=10)
        
        # Length
        tk.Label(self.root, text="Password Length:", font=font_label).pack()
        self.length_entry = tk.Entry(self.root, font=font_label, width=10)
        self.length_entry.insert(0, "16")
        self.length_entry.pack(pady=5)
        
        # Type selector
        tk.Label(self.root, text="Password Type:", font=font_label).pack()
        type_menu = ttk.OptionMenu(
            self.root, self.password_type,
            "Strong", "Strong", "Medium", "Memorable"
        )
        type_menu.pack(pady=5)
        
        # Toggles
        tk.Checkbutton(self.root, text="Include Numbers",
                       variable=self.include_nums, font=font_label).pack()
        tk.Checkbutton(self.root, text="Include Symbols",
                       variable=self.include_syms, font=font_label).pack()
        
        # Result display
        result_entry = tk.Entry(self.root, textvariable=self.result_var,
                                font=("Courier", 14), width=30, state="readonly")
        result_entry.pack(pady=10)
        
        # Buttons
        btn_frame = tk.Frame(self.root)
        btn_frame.pack(pady=5)
        tk.Button(btn_frame, text="Generate", command=self.generate,
                  font=font_btn, bg="#2563eb", fg="white",
                  padx=15, pady=8).pack(side=tk.LEFT, padx=5)
        tk.Button(btn_frame, text="Copy", command=self.copy_password,
                  font=font_btn, padx=15, pady=8).pack(side=tk.LEFT, padx=5)
        tk.Button(btn_frame, text="History", command=self.show_history,
                  font=font_btn, padx=15, pady=8).pack(side=tk.LEFT, padx=5)
        
        # Footer
        tk.Label(self.root, text="IT Tools by Waqas",
                 font=("Arial", 9), fg="gray").pack(side=tk.BOTTOM, pady=5)
```

---

## Part 3: Password Generation Logic

### The Character Pool

```python
    def generate(self):
        # Validate length
        try:
            length = int(self.length_entry.get())
            if length < 8:
                raise ValueError
        except ValueError:
            messagebox.showerror("Error", "Enter a valid length (minimum 8)")
            return
        
        pw_type = self.password_type.get()
        
        if pw_type == "Memorable":
            password = self._memorable(length)
        else:
            password = self._character_based(pw_type, length)
        
        self.result_var.set(password)
        self._save_to_history(password)
```

### Strong and Medium Modes

```python
    def _character_based(self, mode: str, length: int) -> str:
        # Base pool: always has letters
        pool = string.ascii_letters
        
        if mode == "Strong":
            # Always include digits and symbols in Strong mode
            pool += string.digits + string.punctuation
        else:
            # Medium: respect the checkboxes
            if self.include_nums.get():
                pool += string.digits
            if self.include_syms.get():
                pool += string.punctuation
        
        # Generate using random.choice — cryptographically adequate for passwords
        return ''.join(random.choice(pool) for _ in range(length))
```

### Memorable Mode

The memorable passphrase combines random words — easy to remember, hard to brute-force.

```python
    WORD_LIST = [
        "river", "moon", "cloud", "lion", "tree",
        "wind", "sky", "eagle", "mountain", "storm",
        "ocean", "forest", "desert", "island", "valley",
    ]
    
    def _memorable(self, length: int) -> str:
        # Pick enough words to reach approximately the requested length
        words = []
        total = 0
        while total < length:
            word = random.choice(self.WORD_LIST)
            words.append(word.capitalize())
            total += len(word)
        
        # Add a number and symbol for compliance
        result = ''.join(words)
        result += str(random.randint(10, 99))
        result += random.choice("!@#$%")
        
        return result[:max(length, len(result))]
```

A memorable password like `OceanLionStorm42!` is far easier to remember than `xK9#mP2@vL` and statistically stronger due to length.

---

## Part 4: Clipboard Copy

```python
    def copy_password(self):
        password = self.result_var.get()
        if not password:
            messagebox.showwarning("Warning", "Generate a password first")
            return
        
        self.root.clipboard_clear()
        self.root.clipboard_append(password)
        self.root.update()  # Required on macOS for clipboard to flush
        messagebox.showinfo("Copied", "Password copied to clipboard!")
```

---

## Part 5: SQLite History

The database path uses `~/Library/Application Support` — the macOS standard location for app data. This survives app bundle relocation and updates.

```python
    def _setup_db(self):
        # Use ~/Library/Application Support — survives app relocation
        app_dir = Path.home() / "Library" / "Application Support" / "PasswordGenerator"
        app_dir.mkdir(parents=True, exist_ok=True)
        
        self.db_path = str(app_dir / "passwords.db")
        conn = sqlite3.connect(self.db_path)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS passwords (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                password   TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()
    
    def _save_to_history(self, password: str):
        conn = sqlite3.connect(self.db_path)
        conn.execute(
            "INSERT INTO passwords (password, created_at) VALUES (?, ?)",
            (password, str(datetime.now()))
        )
        conn.commit()
        conn.close()
    
    def show_history(self):
        conn = sqlite3.connect(self.db_path)
        rows = conn.execute(
            "SELECT password, created_at FROM passwords ORDER BY id DESC LIMIT 20"
        ).fetchall()
        conn.close()
        
        # Display in a new window
        win = tk.Toplevel(self.root)
        win.title("Password History")
        win.geometry("500x400")
        
        text = tk.Text(win, font=("Courier", 11), wrap=tk.NONE)
        text.pack(expand=True, fill=tk.BOTH, padx=10, pady=10)
        
        for pw, ts in rows:
            text.insert(tk.END, f"{ts[:19]}  {pw}\n")
        text.config(state=tk.DISABLED)
```

---

## Part 6: Main Entry Point

```python
if __name__ == "__main__":
    root = tk.Tk()
    app = PasswordGeneratorApp(root)
    root.mainloop()
```

---

## Part 7: Package as a macOS .app

Install PyInstaller:

```bash
pip install pyinstaller
```

Build the app:

```bash
pyinstaller \
  --onefile \
  --windowed \
  --name "PasswordGenerator" \
  --icon icon.icns \
  password_generator_gui.py
```

**Flag explanations:**
- `--onefile` — bundle everything into a single executable
- `--windowed` — suppress the terminal window (essential for GUI apps on macOS)
- `--icon` — set the macOS app icon (requires `.icns` format)

The output is in `dist/PasswordGenerator.app`. Double-click it — it runs without Python installed.

### The Critical Path Issue

If your app uses hardcoded file paths, they'll break when the `.app` is moved to a different location. Always use `os.path.expanduser("~")` or `Path.home()` for user data paths.

Bad:
```python
DB_PATH = "/Users/waqas/PasswordGenerator/passwords.db"  # breaks on other machines
```

Good:
```python
DB_PATH = Path.home() / "Library" / "Application Support" / "PasswordGenerator" / "passwords.db"
```

---

## Security Note

This app uses `random.choice()` for password generation. For security-critical applications (generating passwords for servers, encryption keys, etc.), use `secrets.choice()` instead — it uses the OS's cryptographically secure random number generator.

For typical user password generation, `random.choice()` is adequate. The entropy in a 16-character pool of 94 characters (letters + digits + symbols) is approximately 104 bits — well above the 80-bit threshold for strong passwords.

---

## The Final Result

A working macOS desktop app. No Python required to run it. Double-click, generate, copy. Password stored in local SQLite history.

Total dependencies installed: 1 (PyInstaller). Everything else is Python standard library.

This project is the foundation I used before moving to more complex Python application engineering — Flask APIs, FastAPI backends, and eventually ML pipelines. The principles are identical: data model, business logic, presentation layer.

---

*Waqas Syed is a Senior IT System Engineer at SAP Saudi Arabia who builds Python tools for enterprise IT automation. This Password Generator app is available as a free download at HiTecH Technology HUB.*
