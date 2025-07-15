# 🛠️ Git & Jira Workflow Guide (Team Practice)

A professional-style workflow for contributors and reviewers to simulate working on a dev team using Git, GitHub, and Jira.

## Table of Contents

- [Contributor Workflow](#contributor-workflow)
- [Reviewer Workflow](#reviewer-workflow)

## Contributor Workflow

1. **Pick a Jira Ticket**

   - Move it to "In Progress".
   - Assign it to yourself.

2. **Sync with Remote `main`**

   ```bash
   git checkout main
   git pull origin main
   ```

3. Create a New Branch

   ```
   git checkout -b feat/ABC-123-short-description
   ```

- Naming format:

  - feat/ABC-123-login-form
  - bugfix/ABC-456-form-validation
  - chore/ABC-789-update-deps

4. Do the Work

- Commit often with descriptive messages:

  ```
  git commit -m "ABC-123: Add login form with validation"
  ```

5. Rebase with main **Often**

   ```
   git fetch origin
   git rebase origin/main
   ```

- If there are conflicts, Git will pause and let you fix them:

  ```
  # after fixing conflicts in your editor
  git add .
  git rebase --continue
  ```

- Or, if things go sideways:

  ```
  git rebase --abort  # bail out and go back to how things were
  ```

6. Squash Commits (Before Push)

   ```
   git rebase -i origin/main
   ```

7. Push Your Branch

   ```
   git push origin feat/ABC-123-short-description
   ```

8. Create a Pull Request

- Link to the Jira ticket.

- Include:

  - Overview of changes

  - Screenshots (if visual)

  - Notes for the reviewer

- Assign yourself as the author and pick a teammate to review.

9. Handle Review Feedback

- Push updates as needed.

- Rebase again if necessary.

10. After Merge

```
git checkout main
git pull origin main
git branch -d feat/ABC-123-short-description
git remote prune origin
```

# Reviewer Workflow

1. Get Assigned a PR

- React with excitement 😅

2. Pull the Branch Locally

```
git fetch origin
git checkout feat/ABC-123-short-description
```

3. Test the Code Locally

- Run it. Try it out.

4. Review the PR on GitHub

- Use inline comments.
- Leave constructive feedback.
- Use GitHub review tools:
  - Approve
  - Request Changes

5. If Approved

- Merge using Squash and Merge.
- Delete the remote branch.

6. Clean Up Locally

```
git checkout main
git pull origin main
git branch -d feat/ABC-123-short-description
```

✅ Team Best Practices

- Always include the Jira ticket ID in branch names and commits.
- Make small, focused commits.
- Rebase often to keep your branch conflict-free.
- Use PR templates and follow code review etiquette.
- Keep your local branches clean (use --prune often).
- Learn by doing — mistakes are part of the process!

🧪 Optional Team Challenges

- Rotate who reviews PRs each sprint.
- Simulate messy PRs to practice conflict resolution.
- Appoint a rotating "Tech Lead" to assign or triage tickets.
- Do pair programming or live code walkthroughs occasionally.
- This workflow is meant for practice and team growth. Customize it to fit your crew’s vibe and goals!

---
