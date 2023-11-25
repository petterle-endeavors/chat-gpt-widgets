function createSandboxedIframe(htmlContent: string) {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'block';
  iframe.setAttribute('sandbox', '');
  document.body.appendChild(iframe);

  // In case CSP still blocks blob URLs, you might need an extension's web-accessible resource
  let blob = new Blob([htmlContent], { type: 'text/html' });
  let url = URL.createObjectURL(blob);

  iframe.src = url;

  // Clean up the blob URL after the iframe has loaded
  iframe.onload = () => {
    URL.revokeObjectURL(url);
  };
}

function injectHTMLCode() {
  console.log('injectHTML() called');
  
  const codeBlocks = document.querySelectorAll('pre div code.language-html');
  codeBlocks.forEach(codeBlock => {
    const rawHTML = codeBlock.textContent;
    
    if (!rawHTML) {
      return;
    }

    let iframe = document.createElement('iframe');
    iframe.style.display = 'block';
    iframe.setAttribute('sandbox', 'allow-scripts');
    document.body.appendChild(iframe);
  
    // In case CSP still blocks blob URLs, you might need an extension's web-accessible resource
    let blob = new Blob([rawHTML], { type: 'text/html' });
    let url = URL.createObjectURL(blob);
  
    iframe.src = url;
  
    // Clean up the blob URL after the iframe has loaded
    iframe.onload = () => {
      URL.revokeObjectURL(url);
    };

    codeBlock.parentElement?.replaceChild(iframe, codeBlock);

  });
}

setTimeout(injectHTMLCode, 1000);