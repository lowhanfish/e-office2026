# Task: Ignore server/venv in Git

## Plan Steps

- [x] Update root .gitignore with Python/Next.js ignores (including server/venv/) **DONE**
- [ ] Untrack server/venv: `git rm -r --cached server/venv/`
- [ ] Commit changes: `git add .gitignore && git commit -m "Update .gitignore: ignore server/venv & Python artifacts"`
- [ ] Verify: `git status` (venv should be ignored)
- [ ] Push: `git push`
- [ ] Optional: Recreate venv if needed (`cd server && rm -rf venv && python3 -m venv venv && pip install -r requirements.txt`)
