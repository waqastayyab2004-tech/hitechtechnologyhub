---
title: "Claude Code Beginner Guide"
date: "2026-06-28"
excerpt: "Claude Code is Anthropic's AI coding assistant that runs right in your terminal. This guide walks you through setup, key features, and how to use it for real IT work."
tags: ["Claude AI", "Claude Code", "AI Tools", "Beginner"]
author: "Waqas Syed"
readTime: "8 min read"
featured: true
---
<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
<img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80&auto=format&fit=crop" alt="Claude Code AI coding assistant terminal" style="width:100%; height:280px; object-fit:cover; display:block;"/>
<p style="background:#0f172a; color:#475569; font-size:0.72rem; padding:6px 12px; margin:0; text-align:right;">Photo: Unsplash</p>
</div>


# Claude Code Beginner Guide

Claude Code is Anthropic's AI assistant that runs directly in your terminal. Unlike ChatGPT which you access through a browser, Claude Code can read your files, run commands, and make code changes — all through a conversation.

## What Makes Claude Code Different

| Feature | ChatGPT / Claude.ai | Claude Code |
|---------|---------------------|-------------|
| Reads your files | ❌ | ✅ |
| Runs terminal commands | ❌ | ✅ |
| Edits code directly | ❌ | ✅ |
| Remembers project context | ❌ | ✅ (CLAUDE.md) |
| Works offline | ❌ | ❌ |

## Installation

```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Verify
claude --version
```

You'll need an Anthropic API key from console.anthropic.com.

## Your First Session

```bash
# Navigate to your project
cd ~/my-python-project

# Start Claude Code
claude

# Ask it something
> explain this codebase to me
> fix the bug in auth.py
> write tests for the login function
```

## Key Features

### 1. CLAUDE.md — Project Memory
Create a `CLAUDE.md` file in your project root. Claude reads this automatically and follows your instructions:

```markdown
# My Project

## Rules
- Always use Python type hints
- Never commit API keys
- Use SQLite for the database
```

### 2. File Operations
Claude Code can read, edit, and create files:
```
> read app.py and explain what each function does
> add error handling to the database connection
> create a new file called utils.py with helper functions
```

### 3. Running Commands
It can run shell commands on your behalf:
```
> run the tests
> check if port 8080 is in use
> show me the git log for the last week
```

### 4. MCP Servers (Extensions)
Claude Code supports Model Context Protocol servers — plugins that give it access to external systems like ServiceNow, GitHub, Gmail, and more.

## Real Use Cases for IT Professionals

### Automate SNOW Reports
```
> write a Python script that connects to ServiceNow via REST API 
  and emails me tickets assigned to my group every morning
```

### Generate PowerShell Scripts
```
> write a PowerShell script that exports all AD users who haven't 
  logged in for 90 days to a CSV file
```

### Debug Network Issues
```
> I'm getting SSL certificate errors in my Python requests. 
  Here's the error: [paste error]. What's wrong?
```

### Build Web Tools Quickly
```
> create a simple Flask app with a form that lets me look up 
  Active Directory users by employee ID
```

## Tips for Beginners

1. **Be specific** — "Fix the login bug" is vague. "The login function in auth.py throws a KeyError when username is missing — fix it with proper validation" is clear.

2. **Use CLAUDE.md** — Write your tech stack, coding standards, and project context here. Claude will follow them.

3. **Approve tool use** — Claude will ask before running commands. Read what it's about to do before approving.

4. **Start small** — Begin with "explain this file to me" before asking for complex changes.

5. **Check its work** — Claude is excellent but not infallible. Review diffs before accepting.

## My Personal Setup

I use Claude Code daily for:
- Building automation scripts for IT tasks
- Debugging Python and FastAPI code
- Creating database queries for ServiceNow data
- Generating HTML/CSS for dashboard pages

It's saved me hours every week. If you're an IT professional who knows basic Python, Claude Code will make you 10x more productive.

## Next Steps

- Visit [claude.ai/code](https://claude.ai/code) to get started
- Read the official docs at docs.anthropic.com
- Try the `/help` command in any session
