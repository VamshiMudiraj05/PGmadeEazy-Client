const ProviderDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user.fullName}!</h1>
      <p>You are logged in as a <strong>Provider</strong>.</p>
      <p>Start adding your PG properties here!</p>
    </div>
  )
}

export default ProviderDashboard
