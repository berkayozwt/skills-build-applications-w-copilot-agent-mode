import ResourceList from './ResourceList.jsx'

function Users() {
  return (
    <ResourceList
      resource="users"
      title="Users"
      description="Profiles, roles, and team membership from the OctoFit data tier."
      fields={[
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'teamName', label: 'Team' },
        { key: 'role', label: 'Role' },
      ]}
    />
  )
}

export default Users