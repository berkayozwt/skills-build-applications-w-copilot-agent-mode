import ResourceList from './ResourceList.jsx'

function Leaderboard() {
  return (
    <ResourceList
      resource="leaderboard"
      title="Leaderboard"
      description="Competitive rankings by athlete, team, and weekly points."
      fields={[
        { key: 'rank', label: 'Rank' },
        { key: 'username', label: 'User' },
        { key: 'teamName', label: 'Team' },
        { key: 'weeklyPoints', label: 'Weekly Points' },
      ]}
    />
  )
}

export default Leaderboard