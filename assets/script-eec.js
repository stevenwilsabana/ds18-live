window.addEventListener("klaviyoForms", function(e) {
  if (e.detail.type == 'submit' && e.detail.formId == 'SzjQ53') {
    let email = e.detail.metaData.$email;
    
    _learnq.push(['reset']);

    _learnq.push(['identify', {
      'email': email
    }]);

    setTimeout(function() {
      _learnq.push(['track', 'ITTD: EEC', {
        'Email': email
      }]);
    }, 1000);

    console.log(`
    - Email: ${email}
    `);
    
  }
});