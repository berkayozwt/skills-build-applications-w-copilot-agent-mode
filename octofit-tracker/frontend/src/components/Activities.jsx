import ResourceList from './ResourceList.jsx'

function Activities() {
  return (
    <ResourceList
      resource="activities"
      title="Activities"
      description="Recent logged workouts with distance, duration, and calorie metrics."
      fields={[
        { key: 'username', label: 'User' },
        { key: 'type', label: 'Type' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'caloriesBurned', label: 'Calories' },
      ]}
    />
  )
}

export default Activities