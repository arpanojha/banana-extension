var backend_url = 'http://banana-lb-1345717375.us-east-2.elb.amazonaws.com:8000/'




document.addEventListener('DOMContentLoaded', function() {
  var donateButton = document.getElementById('donate');
  donateButton.addEventListener('click', function() {
    window.open('https://checkout.square.site/merchant/ML1BHDZZSY5S3/checkout/V5NTIKJVRL2ATKTKO2HAT6UN', '_blank');
  });

  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function() {
    // Get the input text
    var inputText = document.getElementById('input-text').value;

    // Capitalize the input text
    var capitalizedText = inputText.toUpperCase();
    const url = backend_url + 'banana/?question=' + inputText;

    // Show loading text
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<strong>Loading...</strong>';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Store the response in a variable
        const posts = data;
        outputDiv.innerHTML =
          '<strong>Here is what I found:</strong> ' + posts['answer']['result'];
        // Do something with the response data
        console.log(posts);
      })
      .catch(error => console.error(error))
      .finally(() => {
        // Remove loading text

      });
  });

  var summitB = document.getElementById('uploading-pdf');
  summitB.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      var currentUrl = currentTab.url;
  
      
      // Show loading text
      var outputDiv = document.getElementById('pdfoutcome');
      outputDiv.innerHTML = '<strong>Loading...</strong>';
    
      fetch(currentUrl)
        .then(response => {
          const contentLength = response.headers.get('content-length');
          const maxSize = 3 * 1024 * 1024; // Three MB limit
    
          if (contentLength && parseInt(contentLength) > maxSize) {
            outputDiv.innerHTML = '<strong>File size exceeds the limit of 3 MB</strong>';
            throw new Error('File size exceeds the limit of 3 MB.');
          }
        })
        .then(() => {
          const url = backend_url + 'send_me_url/?url=' + currentUrl;
    
          fetch(url)
            .then(response => response.json())
            .then(data => {
              // Store the response in a variable
              const posts = data;
              outputDiv.innerHTML = '<strong>Current PDF:</strong> ' + currentUrl + ' Uploaded';
              // Do something with the response data
              console.log(posts);
              return posts;
            })
            .catch(error => console.error(error))
            .finally(() => {
              // Remove loading text
            });
        })
        .catch(error => {
          outputDiv.innerHTML = '<strong>Error:</strong> ' + error.message;
        });

    });
  });
});

