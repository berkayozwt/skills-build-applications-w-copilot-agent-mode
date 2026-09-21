import ResourceList from './ResourceList.jsx'

function Teams() {
  return (
    <ResourceList
      resource="teams"
      title="Teams"
      description="Training groups, coaches, and member rosters."
      fields={[
        { key: 'name', label: 'Team' },
        { key: 'city', label: 'City' },
        { key: 'coach', label: 'Coach' },
        { key: 'members', label: 'Members' },
      ]}
    />
  )
}

export default Teams