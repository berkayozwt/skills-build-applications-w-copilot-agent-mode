const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiOriginUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiBaseUrl = `${apiOriginUrl}/api`;

export const apiEnvironment = codespaceName ? `Codespace: ${codespaceName}` : 'Localhost fallback';

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const collectionKeys = ['data', 'results', 'items', 'docs'];
  for (const key of collectionKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  return [];
}

export async function fetchCollection(endpointPath) {
  const path = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
  const response = await fetch(`${apiOriginUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return normalizeCollection(await response.json());
}