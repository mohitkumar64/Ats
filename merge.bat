@echo off
cd /d "C:\Users\adity\Desktop\Ats.worktrees\agents-add-non-technical-skills-tab\builderandats"

echo Checking git status...
git status --short

echo.
echo Adding changes...
git add -A

echo.
echo Checking status after add...
git status --short

echo.
echo Committing changes...
git commit -m "Add non-technical skills tab for professions like LLB and Nursing" -m "- Add nonTechnical section to skills schema with commonSkills and otherSkills^
- Create tabbed SkillsForm with separate Technical and Non-Technical tabs^
- Non-Technical tab includes checkboxes for 18 common skills and text input for custom skills^
- Update sample data with example non-technical skills^
- Maintains backward compatibility with existing technical skills^
^
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo Current branch and log...
git branch -v
git log --oneline -3

echo.
echo Done! You can now push the changes.
pause
