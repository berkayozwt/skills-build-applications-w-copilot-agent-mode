import CollectionView from './CollectionView';

function Activities() {
  return (
    <CollectionView
      collection="activities"
      title="Activities"
      description="Recent training logs from the Octofit community."
      renderCardTitle={(activity) => activity.type}
      columns={[
        { label: 'Athlete', render: (activity) => activity.user?.displayName ?? 'Unknown athlete' },
        { label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
        { label: 'Distance', render: (activity) => (activity.distanceKm ? `${activity.distanceKm} km` : 'N/A') },
        { label: 'Calories', render: (activity) => activity.caloriesBurned },
        { label: 'Logged', render: (activity) => new Date(activity.loggedAt).toLocaleDateString() },
      ]}
    />
  );
}

export default Activities;