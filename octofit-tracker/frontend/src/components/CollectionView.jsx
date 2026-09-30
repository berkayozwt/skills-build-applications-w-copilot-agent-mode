import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function CollectionView({ collection, title, description, columns, renderCardTitle }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const nextItems = await fetchCollection(collection);
        if (isMounted) {
          setItems(nextItems);
          setStatus('ready');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
          setStatus('error');
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [collection]);

  return (
    <section className="data-section">
      <div className="section-heading">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <span className="record-count">{items.length} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-secondary">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="row g-3">
          {items.map((item) => (
            <div className="col-12 col-lg-6" key={item._id ?? JSON.stringify(item)}>
              <article className="data-card">
                <h2>{renderCardTitle(item)}</h2>
                <dl>
                  {columns.map((column) => (
                    <div key={column.label}>
                      <dt>{column.label}</dt>
                      <dd>{column.render(item)}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CollectionView;