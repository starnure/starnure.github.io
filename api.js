// Shared by /shop/ and /account/.
const API = location.hostname === "localhost" ? "https://starnure-api.restarnure.workers.dev" : "https://api.starnure.dev";

function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function loginUrl() {
  return `${API}/v1/auth/login?return=${encodeURIComponent(location.href.split("#")[0])}`;
}

// The signed-in account with its licenses, or null.
async function me() {
  const res = await fetch(API + "/v1/me", { credentials: "include" });
  return res.ok ? res.json() : null;
}

async function post(path, body) {
  const res = await fetch(API + path, {
    method: "POST", credentials: "include",
    headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}),
  });
  const data = res.status === 204 ? {} : await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
