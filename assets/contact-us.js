$(document).ready(function() {

  // Trigger CALL CENTER

  $('#open-phone-hotline').click(function() {$('#phone-link-hotline')[0].click();});



  // Trigger FAQS

  $('#open-navigation-faqs').click(function() {
    window.open('https://ds18.com/pages/help-faq', '_blank');
  });


  // Trigger TECH SUPPORT

  $('#open-phone-support').click(function() {$('#phone-link-support')[0].click();});

  $('#open-navigation-support').click(function() {
    window.open('https://ds18.com/pages/tech-support', '_blank');
  });

  $('#open-email-support').click(function() {
    var email = "support@ds18.com";
    var asunto = "CONTACT US: I NEED HELP - TECH SUPPORT";
    var mensaje = "Hey there!";
    var asuntoCodificado = encodeURIComponent(asunto);
    var mensajeCodificado = encodeURIComponent(mensaje);
    var urlEmail = `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}`;
    window.open(urlEmail, '_blank');
  });



  // Trigger RETURN & EXCHANGES (REATILS)

  $('#open-phone-return-retail').click(function() {$('#phone-link-return-retail')[0].click();});

  $('#open-navigation-return-retail').click(function() {
    window.open('https://ds18.returnlogic.com/', '_blank');
  });

  $('#open-email-return-retail').click(function() {
    var email = "rma@ds18.com";
    var asunto = "CONTACT US: I NEED HELP - RETURN & EXCHANGES (RETAILER)";
    var mensaje = "Hey there!";
    var asuntoCodificado = encodeURIComponent(asunto);
    var mensajeCodificado = encodeURIComponent(mensaje);
    var urlEmail = `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}`;
    window.open(urlEmail, '_blank');
  });


  // Trigger RETURN & EXCHANGES (DEALERS)

  $('#open-phone-return-dealer').click(function() {$('#phone-link-return-dealer')[0].click();});

  $('#open-email-return-dealer').click(function() {
    var email = "warranty@ds18.com";
    var asunto = "CONTACT US: I NEED HELP - RETURN & EXCHANGES (DEALERS)";
    var mensaje = "Hey there!";
    var asuntoCodificado = encodeURIComponent(asunto);
    var mensajeCodificado = encodeURIComponent(mensaje);
    var urlEmail = `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}`;
    window.open(urlEmail, '_blank');
  });


  // Trigger ACCOUNTING

  $('#open-phone-accounting').click(function() {$('#phone-link-accounting')[0].click();});

  $('#open-email-accounting').click(function() {
    var email = "office@ds18.com";
    var asunto = "CONTACT US: I NEED HELP - ACCOUNTING";
    var mensaje = "Hey there!";
    var asuntoCodificado = encodeURIComponent(asunto);
    var mensajeCodificado = encodeURIComponent(mensaje);
    var urlEmail = `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}`;
    window.open(urlEmail, '_blank');
  });


  // Trigger SALES

  $('#open-phone-sales').click(function() {$('#phone-link-sales')[0].click();});

  $('#open-email-sales').click(function() {
    var email = "sales@ds18.com";
    var asunto = "CONTACT US: I NEED HELP - SALES";
    var mensaje = "Hey there!";
    var asuntoCodificado = encodeURIComponent(asunto);
    var mensajeCodificado = encodeURIComponent(mensaje);
    var urlEmail = `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}`;
    window.open(urlEmail, '_blank');
  });


  // Trigger DEALER

  $('#open-navigation-dealer').click(function() {
    window.open('https://ds18.com/pages/sales-form', '_blank');
  });
  
});