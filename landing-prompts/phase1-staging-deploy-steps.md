# Phase 1: deploy to staging, exact steps

Staging builds from fixed branches. The frontend uses `feature/multipage` and the backend uses `release/live-admin`. So `revamp/phase-1` has to be merged into those branches before `deploy.sh` will pick it up.

**Important:** the backend also serves the live site, lmsdomain.com. Deploying the backend changes the live demo form too. That's why step A below checks it first.

---

## A. Paste into Antigravity (backend folder) — safety check only, no deploy

```
Backend repo lmsdomain-landing-backend. Don't deploy, don't touch .env or any database.

This backend also serves the live site lmsdomain.com, whose old frontend still posts enquiries in the old format. Check that the revamp/phase-1 change to controllers/api/enquiry.ts is backward compatible:
1. Show the diff of controllers/api/enquiry.ts between release/live-admin and revamp/phase-1.
2. Confirm an old-style type 1 request still succeeds: one WITH a subject, WITHOUT a learners field, and one with any learners value the old form sends. If ALLOWED_DEMO_LEARNERS would reject a missing or old value, change it so learners is optional and unknown values are stored as-is (only the new form uses the select). Commit `fix(enquiry): keep old demo payload accepted`.
3. Check types 2 and 3 behave exactly as on release/live-admin.
4. npx tsc --noEmit and npm run build pass.
Then merge: git checkout release/live-admin && git pull && git merge --no-ff revamp/phase-1 -m "Merge Phase 1 into release/live-admin". If there are conflicts, stop and show them. Otherwise git push origin release/live-admin. Report what you found in steps 1–3.
```

## B. Paste into Antigravity (frontend folder) — merge for staging

```
Frontend repo lmsdomain-landing-frontend. Don't touch main or .env.
git checkout feature/multipage && git pull && git merge --no-ff revamp/phase-1 -m "Merge Phase 1 into feature/multipage". If there are conflicts, stop and show them. Otherwise run npx tsc --noEmit and npm run build. If both pass, git push origin feature/multipage. Report the merge commit hash.
```

## C. On the server (you, in Terminal)

1. SSH into the server the way you normally do.
2. Before deploying, check the staging frontend env has these two lines (only look at these, don't share the rest):
   ```
   grep -E "^(SITE_ENV|SITE_URL)=" /opt/lmsdomain/<staging frontend env file>
   ```
   They should read `SITE_ENV=staging` and `SITE_URL=https://staging.lmsdomain.online`. If `SITE_ENV` is missing, add it. (If you don't know which env file staging uses, run `grep -n "env" /opt/lmsdomain/deploy.sh` to see.)
3. Deploy the backend first, then the frontend:
   ```
   /opt/lmsdomain/deploy.sh backend
   /opt/lmsdomain/deploy.sh staging
   ```
4. Quick check that the live site still works: open https://lmsdomain.com and send one demo request with organisation "TEST - please ignore". It should succeed.

## D. Back in Antigravity (frontend folder)

Tell it: "Staging is deployed. Continue with Step 5 and Step 6 of `landing-prompts/phase1-push-and-deploy-staging.md`."

Then paste its report here.
