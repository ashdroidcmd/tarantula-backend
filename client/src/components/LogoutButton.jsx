
const LogoutButton = () => {
  return (
    <div className="space-x-2">
      <button
            className="btn btn-error"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>

          <a href="/deleted-items"><button className="btn btn-info">Deleted Items</button></a>
    </div>
  )
}

export default LogoutButton
