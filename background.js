chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "b64-decode",
    title: "Decode Base64 selection",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "b64-encode",
    title: "Encode selection to Base64",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = info.selectionText || "";
  let result;
  try {
    if (info.menuItemId === "b64-decode") {
      let s = text.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
      while (s.length % 4) s += "=";
      result = new TextDecoder().decode(
        Uint8Array.from(atob(s), (c) => c.charCodeAt(0)),
      );
    } else {
      result = btoa(String.fromCharCode(...new TextEncoder().encode(text)));
    }
  } catch {
    chrome.action.setBadgeText({ text: "!" });
    setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1500);
    return;
  }

  // Copy the result to the clipboard
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (t) => {
      const ta = document.createElement("textarea");
      ta.value = t;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    },
    args: [result],
  });

  chrome.action.setBadgeText({ text: "✓" });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1500);
});
