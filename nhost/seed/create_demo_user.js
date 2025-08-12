/**
 * Example seed for creating a demo user via Nhost Admin GraphQL.
 * This requires admin privilege or use Nhost SDK with admin key.
 * Replace placeholders before use.
 */
const fetch = require("node-fetch");
const NHOST_ADMIN_URL = "https://YOUR_NHOST_BACKEND.nhost.app/v1/auth/admin";
const ADMIN_SECRET = "XXX_ADMIN_SECRET";

async function createUser(email, password) {
  const res = await fetch(`${NHOST_ADMIN_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": ADMIN_SECRET
    },
    body: JSON.stringify({ email, password })
  });
  console.log(await res.json());
}

createUser("demo@example.com", "Password123!");
