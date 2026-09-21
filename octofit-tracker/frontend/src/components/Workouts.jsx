import ResourceList from './ResourceList.jsx'

function Workouts() {
  return (
    <ResourceList
      resource="workouts"
      title="Workouts"
      description="Personalized workout suggestions for endurance, strength, and recovery."
      fields={[
        { key: 'title', label: 'Workout' },
        { key: 'focus', label: 'Focus' },
        { key: 'level', label: 'Level' },
        { key: 'durationMinutes', label: 'Minutes' },
      ]}
    />
  )
}

export default Workouts