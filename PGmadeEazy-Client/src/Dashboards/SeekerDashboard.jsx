const SeekerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user.fullName}!</h1>
      <p>You are logged in as a <strong>Seeker</strong>.</p>
      <p>Explore PG Listings here!</p>
    </div>
  )
}

export default SeekerDashboard
