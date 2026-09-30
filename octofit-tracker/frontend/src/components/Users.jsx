import CollectionView from './CollectionView';

function Users() {
  return (
    <CollectionView
      // Expected URL: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
      endpointPath="/api/users/"
      title="Users"
      description="Profiles and goals for Octofit athletes."
      renderCardTitle={(user) => user.displayName ?? user.username}
      columns={[
        { label: 'Username', render: (user) => user.username },
        { label: 'Email', render: (user) => user.email },
        { label: 'Age', render: (user) => user.age },
        { label: 'Goal', render: (user) => user.fitnessGoal },
      ]}
    />
  );
}

export default Users;