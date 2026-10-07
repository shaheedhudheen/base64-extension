const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");
const statusEl = document.getElementById("status");

let statusTimer;
function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.className = isError ? "error" : "ok";
  clearTimeout(statusTimer);
  if (msg) statusTimer = setTimeout(() => (statusEl.textContent = ""), 2500);
}

// Unicode-safe encoding (handles emoji, accents, CJK, etc.)
function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

// Tolerates URL-safe Base64 (-, _), whitespace, and missing padding
function decodeBase64(str) {
  let s = str.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  const binary = atob(s); // throws on invalid Base64
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

document.getElementById("encodeBtn").addEventListener("click", () => {
  if (!inputEl.value) return setStatus("Nothing to encode.", true);
  outputEl.value = encodeBase64(inputEl.value);
  setStatus("Encoded ✓");
});

document.getElementById("decodeBtn").addEventListener("click", () => {
  if (!inputEl.value) return setStatus("Nothing to decode.", true);
  try {
    outputEl.value = decodeBase64(inputEl.value);
    setStatus("Decoded ✓");
  } catch {
    setStatus("Invalid Base64 or binary (non-UTF-8) data.", true);
  }
});

document.getElementById("swapBtn").addEventListener("click", () => {
  if (!outputEl.value) return setStatus("No result to move.", true);
  inputEl.value = outputEl.value;
  outputEl.value = "";
  inputEl.focus();
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  if (!outputEl.value) return setStatus("Nothing to copy.", true);
  await navigator.clipboard.writeText(outputEl.value);
  setStatus("Copied to clipboard ✓");
});

document.getElementById("clearBtn").addEventListener("click", () => {
  inputEl.value = "";
  outputEl.value = "";
  statusEl.textContent = "";
  inputEl.focus();
});
