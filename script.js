
var backend_url = 'http://banana-lb-1345717375.us-east-2.elb.amazonaws.com:8000/'
document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function() {
    // Get the input text
    var inputText = document.getElementById('input-text').value;

    // Capitalize the input text
    var capitalizedText = inputText.toUpperCase();
    const url = backend_url+'banana/?question='+inputText;

    fetch(url)
    .then(response => response.json())
    .then(data => {
    // Store the response in a variable
    const posts = data;
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<strong>Here is what I found:</strong> ' + posts['answer']['result'];
    // Do something with the response data
    console.log(posts);
})
    .catch(error => console.error(error));
    // Output the capitalized text
    // var outputDiv = document.getElementById('output');
    // outputDiv.innerHTML = '<strong>Capitalized Text:</strong> ' + capitalizedText;

});
  var summitB = document.getElementById('uploading-pdf');
  summitB.addEventListener('click',function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0];
      var currentUrl = currentTab.url;
      const fileUrl = currentUrl;

      const url = backend_url+'send_me_url/?url='+currentUrl;

    fetch(url)
    .then(response => response.json())
    .then(data => {
    // Store the response in a variable
    const posts = data;
    var outputDiv = document.getElementById('pdfoutcome');
      outputDiv.innerHTML = '<strong>Current Text:</strong> ' + currentUrl+" "+"Uploaded ";
    // Do something with the response data
    console.log(posts);
    return posts
})
    .catch(error => console.error(error));

  //     fetch(fileUrl)
  //     .then(response => response.blob())
  //     .then(blob => {
  //       const formData = new FormData();
  //       formData.append('file', blob, 'example.pdf');
  //       const options = {
  //         method: 'POST',
  //         body: formData
  //     };
  //     return fetch('http://127.0.0.1:8000/uploadfile/', options);
  // })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  //     var outputDiv = document.getElementById('pdfoutcome');
  //     outputDiv.innerHTML = '<strong>Current Text:</strong> ' + currentUrl;
  });
    
})
});

