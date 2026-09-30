import CollectionView from './CollectionView';

function Workouts() {
  return (
    <CollectionView
      collection="workouts"
      title="Workouts"
      description="Suggested sessions matched to athlete goals."
      renderCardTitle={(workout) => workout.title}
      columns={[
        { label: 'Category', render: (workout) => workout.category },
        { label: 'Difficulty', render: (workout) => workout.difficulty },
        { label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
        { label: 'Goal', render: (workout) => workout.targetGoal },
        { label: 'Exercises', render: (workout) => workout.exercises?.join(', ') ?? 'N/A' },
      ]}
    />
  );
}

export default Workouts;