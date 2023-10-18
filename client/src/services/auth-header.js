export default function authHeader() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": accessToken };
  }
  return {};
}
