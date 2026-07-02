import API from "./API"

async function getCSRF() {
  await fetch(`${API}/csrf/`, {
    method: "GET",
    credentials: "include",
  })
}

export default getCSRF