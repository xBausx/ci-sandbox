# ci-sandbox

Sandbox repo to test and demo a modern GitHub workflow/tooling stack one tool at a time.

## What this repo is for

This repository is used to validate workflow and developer-tooling integrations in small, reviewable steps. Each tool is implemented on its own branch, tested, and only then considered done.

Examples already covered in this repo include:

- split CI checks
- reviewdog lint feedback
- branch protection / required checks
- Husky + lint-staged
- CodeRabbit
- PR-Agent
- SonarCloud
- AI-assisted commit messages
- Commitizen fallback for conventional commits

## Quick start after clone

Install dependencies:

```bash
npm ci
```

If you want to use AI-generated commit messages, run first-time setup:

```bash
npm run commit:ai:setup
```

Then create commits with either:

```bash
npm run commit:ai -- nsp-123
```

or fallback:

```bash
npm run commit:cz -- nsp-123
```

## Available scripts

### Quality / verification

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm run test
```

Run build:

```bash
npm run build
```

Run quick verification:

```bash
npm run verify:quick
```

Run full verification:

```bash
npm run verify
```

### Commit tooling

AI-assisted commit message flow:

```bash
npm run commit:ai -- nsp-123
```

Manual conventional commit fallback:

```bash
npm run commit:cz -- nsp-123
```

AI setup:

```bash
npm run commit:ai:setup
```

## Commit tooling

This repo supports two ways to create conventional commits with automatic ticket injection.

### Preferred flow: AI-assisted commits

Use:

```bash
npm run commit:ai -- nsp-123
```

This flow:

- analyzes staged changes with `aicommits`
- proposes a conventional commit message
- commits interactively
- injects the ticket into the scope through the `prepare-commit-msg` hook

Example final result:

```text
feat(nsp-123): add commitizen fallback
```

### Fallback flow: Commitizen

Use this when AI setup is missing, the API key is not configured, or you want a deterministic manual prompt flow:

```bash
npm run commit:cz -- nsp-123
```

This flow:

- opens Commitizen prompts
- generates a conventional commit message
- commits interactively
- injects the ticket into the scope through the same `prepare-commit-msg` hook

Example final result:

```text
fix(nsp-123): update commit hook behavior
```

## Ticket injection behavior

Both commit flows share the same ticket-enforcement layer.

If a ticket is supplied, the hook rewrites the subject into this shape:

```text
type(nsp-123): message
```

If the generated message already has a scope, the scope is replaced with the ticket.

Example:

```text
docs(component): update readme
```

becomes:

```text
docs(nsp-123): update readme
```

If the message is not conventional, it falls back to:

```text
chore(nsp-123): original message
```

If no explicit ticket is supplied, the scripts may optionally fall back to parsing the current branch name for something like `nsp-123`.

## Recommended workflow

Stage your files first:

```bash
git add .
```

Then use one of these:

```bash
npm run commit:ai -- nsp-123
```

or:

```bash
npm run commit:cz -- nsp-123
```

## First-time AI setup

`aicommits` is installed locally in this repo, not globally.

Use:

```bash
npm run commit:ai:setup
```

or:

```bash
npx aicommits setup
```

If needed, configure the API key with:

```bash
npx aicommits config set OPENAI_KEY="YOUR_KEY_HERE"
```

## Important usage notes

These are **npm scripts**, not git subcommands.

Use:

```bash
npm run commit:ai -- nsp-123
npm run commit:cz -- nsp-123
```

Do not use:

```bash
git commit:ai -- nsp-123
git run commit:ai -- nsp-123
```

## New machine setup

After cloning on a new machine:

```bash
npm ci
npm run commit:ai:setup
```

Then verify at least one commit flow works:

```bash
npm run commit:ai -- nsp-123
```

or:

```bash
npm run commit:cz -- nsp-123
```

## Troubleshooting

### `aicommits` is not recognized

This repo uses a local install, so do not expect `aicommits` to be globally available on PATH.

Use:

```bash
npm run commit:ai:setup
```

or:

```bash
npx aicommits setup
```

### AI commit fails because no API key is configured

Set it with:

```bash
npx aicommits config set OPENAI_KEY="YOUR_KEY_HERE"
```

Then retry:

```bash
npm run commit:ai -- nsp-123
```

### AI flow is unavailable

Use the fallback immediately:

```bash
npm run commit:cz -- nsp-123
```

### Husky hooks are not running

Reinstall dependencies and ensure hooks are installed:

```bash
npm ci
npm run prepare
```

## Security note

Do not paste real API keys into documentation, issues, pull requests, or chat logs.

If a key is ever exposed, revoke it immediately and replace it with a new one.
