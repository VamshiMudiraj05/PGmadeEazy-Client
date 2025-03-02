import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data stored during login
    const storedUser = localStorage.getItem("loggedInUser");
    console.log("Stored user:", storedUser); // Debugging purpose
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">No user data found. Please log in.</p>
      </div>
    );
  }

  return (
    <section className="bg-black/90 backdrop-blur-lg px-4 py-20 min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center text-center gap-6 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md shadow-orange-600/20 w-full max-w-md">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Profile Dashboard
        </h1>
        <p className="text-lg text-gray-400">
          Welcome, <span className="text-orange-500">{user.username}</span>!
        </p>
        <div className="text-white">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Add additional user details here if needed */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
