# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit Tracker multi-tier application.

## API configuration

For Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` so the frontend can call the backend on port `8000`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, API calls use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api`.
