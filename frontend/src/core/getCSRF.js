import API from "./dev"

async function getCSRF() {
  await fetch(`${API}/csrf/`, {
    method: "GET",
    credentials: "include",
  });
}

export default getCSRF