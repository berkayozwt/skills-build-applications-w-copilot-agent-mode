import CollectionView from './CollectionView';

function Teams() {
  return (
    <CollectionView
      // Expected URL: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
      endpointPath="/api/teams/"
      title="Teams"
      description="Training groups and their current members."
      renderCardTitle={(team) => team.name}
      columns={[
        { label: 'Description', render: (team) => team.description },
        { label: 'Captain', render: (team) => team.captain?.displayName ?? 'Unassigned' },
        {
          label: 'Members',
          render: (team) => team.members?.map((member) => member.displayName ?? member.username).join(', ') ?? 'None',
        },
      ]}
    />
  );
}

export default Teams;