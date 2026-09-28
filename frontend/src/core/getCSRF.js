import apiRequest from "@/core/apiRequest"

async function getCSRF() {
  await apiRequest("/csrf/")
}

export default getCSRF