export async function generateTraitSuggestions(bio, currentTraits = []) {
  try {
    const res = await fetch("/api/traits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, currentTraits }),
    });

    const data = await res.json();
    return data.traits;
  } catch (error) {
    console.error("Failed to get traits:", error);
    return ["creative", "empathetic", "adventurous", "witty", "loyal"];
  }
}
