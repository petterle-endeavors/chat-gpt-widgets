

function injectHTMLCode() {
  console.debug('injectHTML() called');
  
  const codeBlocks = document.querySelectorAll('pre div code.language-html');
  codeBlocks.forEach(codeBlock => {
    const rawHTML = codeBlock.textContent;
    console.debug('rawHTML', rawHTML);
    if (!rawHTML) {
      return;
    }

    let iframe = document.createElement('iframe');
    iframe.style.display = 'block';
    iframe.setAttribute('sandbox', 'allow-scripts');
    document.body.appendChild(iframe);


    // The HTML to be injected, including the styles from the parent document
    let iframeContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>body { background-color: white; }</style>
        </head>
        <body>
          ${rawHTML}
        </body>
      </html>
    `;

    let blob = new Blob([iframeContent], { type: 'text/html' });
    let url = URL.createObjectURL(blob);
  
    iframe.src = url;
  
    // Clean up the blob URL after the iframe has loaded
    iframe.onload = () => {
      URL.revokeObjectURL(url);
    };
    codeBlock.parentElement?.replaceChild(iframe, codeBlock);

  });
}

function startObservingDOMChanges() {
  let timeoutId: NodeJS.Timeout | null = null;

  const observer = new MutationObserver(() => {
    console.debug('DOM changed');
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      injectHTMLCode(); // This function will be called once no mutations have been observed for 1 second
    }, 500); // Wait 1 second after the last mutation
  });

  const config = { childList: true, subtree: true };
  const target = document.body; // Or narrow this down as necessary
  observer.observe(target, config);
}

// Call the function to start observing for changes
startObservingDOMChanges();