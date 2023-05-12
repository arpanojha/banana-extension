// Replace 'sample-extension' with the id of the extension you
// registered on ExtensionPay.com to test payments. You may need to
// uninstall and reinstall the extension to make it work.
// Don't forget to change the ID in background.js too!
const extpay = ExtPay('banana1extension'); 

document.querySelector('button').addEventListener('click', extpay.openPaymentPage);

extpay.getUser().then(user => {
    var variable = user.paid; // Set the variable based on user.paid
   
    // Function to toggle the visibility of the elements based on the variable
    function toggleElementsVisibility() {
      var bananaBreadHeading = document.getElementById('banana-bread-heading');
      var uploadingPdfButton = document.getElementById('uploading-pdf');
      var pdfOutcomeDiv = document.getElementById('pdfoutcome');
      var inputForm = document.getElementById('input-form');
      var outputDiv = document.getElementById('output');
      var webGoesHereDiv = document.getElementById('webgoeshere');

      if (variable) {
        
        document.querySelector('button').innerHTML = 'Profile'
  
       
      } else {
        document.querySelector('p').innerHTML = 'Sign Up! '
        document.querySelector('button').innerHTML = 'Subscribe'
      }
    }

    // Call the function to initially toggle the elements visibility
    toggleElementsVisibility();
}).catch(err => {
    document.querySelector('p').innerHTML = "Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet";
});