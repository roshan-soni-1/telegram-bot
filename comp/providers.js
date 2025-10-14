const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

let providers = {};

async function loadProviders() {
  try {
//    const res = await fetch("http://localhost:3000/chat/providers");
    console.log(`${process.env.API_URL}/chat/providers`)
    const res = await fetch((process.env.MODE=="development")?"http://localhost:3000/chat/providers":`${process.env.API_URL}/chat/providers`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    providers = Object.fromEntries(
      Object.entries(data).map(([key, providerData]) => {
        const models = providerData.models || [];
        return [key, { name: providerData.name, models }];
      })
    );

    console.log("Loaded providers:", Object.keys(providers));
  } catch (err) {
    console.error("Error fetching providers:", err);
  }
}

function getProviders() {
  return providers;
}

module.exports = { loadProviders, getProviders };