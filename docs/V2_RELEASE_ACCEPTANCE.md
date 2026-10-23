# TorqPro-Web v2.0 — Pre-release acceptance checklist

Status: **HOLD — manual acceptance required**  
Development branch: `feature/website-v2-20261020`  
Draft pull request: https://github.com/TorqPro-AI/TorqPro-Web/pull/1

## Verified

- [x] GitHub Actions browser QA completed successfully for commit `cd3e033`: https://github.com/TorqPro-AI/TorqPro-Web/actions/runs/39824664100
- [x] Chromium Playwright job and screenshot upload steps succeeded.
- [x] Both contact emails are present and covered by a mobile regression test: `cekic.ilhan@gmail.com` and `sophoryx0@gmail.com`.
- [x] Pull request remains a draft; no merge into `main` performed.

## Manual acceptance still required

- [ ] Download the `torqpro-v2-screenshots` artifact from the latest successful workflow and examine homepage and Engineering Solutions screenshots at mobile, tablet and desktop widths.
- [ ] Open the public demo https://torqpro-ai.onrender.com/ in a normal browser and verify expected login and navigation. Automated external access was inconclusive; do not claim the demo is publicly reachable until verified.
- [ ] Open https://doi.org/10.5281/zenodo.22873032 and confirm that it resolves to the intended TorqPro AI scholarly record. Automated external access was inconclusive.
- [ ] Review and accept bilingual copy, authentic product imagery, technical limitations and prominent educational-model disclaimers.
- [ ] Verify contact email links on both desktop and mobile.
- [ ] Inspect the workflow run's Annotations section for remaining warnings/notices.
- [ ] Obtain explicit owner approval before marking the PR ready, merging to `main` or publishing.

## Important distinctions

The interactive torque-preload plot and the explanatory bolted-joint diagrams are **educational illustrations**, not application-validated joint calculations. Documentation in the application README describes scope limitations: reported axial stress is not a full reduced-stress evaluation, and scalar average contact pressure is not an FEA pressure distribution.

This checklist does not authorize deployment or merge.