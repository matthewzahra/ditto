import API from "./API"

import apiRequest from "./apiRequest"

async function getCSRF() {
  await apiRequest("/csrf/")
}

export default getCSRF