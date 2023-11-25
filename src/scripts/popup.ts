// This script is responsible for the popup behavior.
document.addEventListener('DOMContentLoaded', function () {
  const runCodeButton = document.getElementById('run-code');
  runCodeButton?.addEventListener('click', runCode);
});

async function runCode(): Promise<void> {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs: chrome.tabs.Tab[]) => {
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id! },
      func: injectHTML,
    });
  });
}

function injectHTML(): void {
  const targetElements = document.querySelectorAll<HTMLElement>(
    'pre div code.language-html',
  );

  targetElements.forEach((elem) => {
    const htmlString = unescapeHtml(elem.innerText); // TypeScript understands innerText
    const newDiv = document.createElement('div');
    newDiv.innerHTML = htmlString.trim();
    elem.parentNode?.insertBefore(newDiv, elem.nextSibling); // Need to check parentNode
  });
}

function unescapeHtml(safe: string): string {
  return safe.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
