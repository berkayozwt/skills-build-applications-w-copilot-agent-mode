import { useEffect, useState } from 'react'
import { apiBaseUrl, envNotice, fetchResource } from '../api.js'

function renderValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value ?? 'n/a')
}

function ResourceList({ resource, title, description, fields }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadResource() {
      try {
        const result = await fetchResource(resource)

        if (!ignore) {
          setItems(result.items)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadResource()

    return () => {
      ignore = true
    }
  }, [resource])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="api-status" role="status">
        <span>{apiBaseUrl}/{resource}/</span>
        <strong>{status === 'ready' ? `${items.length} records` : status}</strong>
      </div>

      {envNotice && <p className="env-notice">{envNotice}</p>}
      {status === 'error' && <p className="error-message">{error}</p>}

      <div className="resource-grid">
        {items.map((item) => (
          <article className="resource-card" key={item._id || item.id || item.username || item.name || item.title}>
            {fields.map((field) => (
              <div className="field-row" key={field.key}>
                <span>{field.label}</span>
                <strong>{renderValue(item[field.key])}</strong>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ResourceList