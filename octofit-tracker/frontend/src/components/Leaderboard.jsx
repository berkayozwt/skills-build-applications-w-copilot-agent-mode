import CollectionView from './CollectionView';

function Leaderboard() {
  return (
    <CollectionView
      collection="leaderboard"
      title="Leaderboard"
      description="Rankings by weekly minutes and total points."
      renderCardTitle={(entry) => `#${entry.rank} ${entry.user?.displayName ?? 'Athlete'}`}
      columns={[
        { label: 'Team', render: (entry) => entry.team?.name ?? 'Independent' },
        { label: 'Points', render: (entry) => entry.totalPoints },
        { label: 'Weekly minutes', render: (entry) => entry.weeklyMinutes },
      ]}
    />
  );
}

export default Leaderboard;