// Función Cuando Carga el Site

function checkCustomerLoginStatus() {
  fetch('/pages/login-status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.isLoggedIn) {
      console.log('🚨 Cliente autenticado');
    } else {
      console.log('🚨 Cliente no autenticado');
    }
  })
  .catch(error => {
    console.error('🚨 Error al consultar el estado del cliente:', error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  checkCustomerLoginStatus();
});






// Función que se dispara al hacer clic en los botones


let checkLoginInterval;
let loginCheckCount = 0;
let checkLoginStatusExecuted = false;
let reloadPageTriggered = false;

function checkLoginStatus() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/pages/login-status', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      console.log('Respuesta de /pages/login-status:', data);

      if (data.isLoggedIn) {
        console.log('🚨 Cliente autenticado. Detener el loader y recargar la página.');
        clearInterval(checkLoginInterval);
        reloadPageRewards();
      } else {
        console.log('🚨 Cliente no autenticado.');
      }
      checkLoginStatusExecuted = true;
    } else {
      console.error('Error en la respuesta del servidor:', xhr.statusText);
    }
  };
  
  xhr.onerror = function() {
    console.error('🚨 Error en la solicitud XMLHttpRequest');
    clearInterval(checkLoginInterval);
    reloadPageRewards();
  };
  
  xhr.send();
}

$('.button-active-js__log-ing').on('click', function() {
  console.log('Iniciando proceso de login...');
  $('#container-information-global__growave').addClass('disable-section-rewards');
  $('#loader-account-login-growave').show();

  if (window.matchMedia("(max-width: 767px)").matches) {
    window.open('/account', '_blank');
  } else {
    setTimeout(function() {
      document.getElementById('link-button-href-account-mobile').click();
    }, 4000);
  };
  
  setTimeout(function() {

    changeMessagePre();
    
    checkLoginInterval = setInterval(function() {
      console.log('Verificando estado de login...');

      if (!checkLoginStatusExecuted) {
        loginCheckCount++;
      } else {
        loginCheckCount = 0;
      }

      if (loginCheckCount === 15) {
        changeMessageAlert();
      }

      checkLoginStatusExecuted = false;
      checkLoginStatus();
    }, 300);
    
  }, 4000);
});

function changeMessagePre(){
  $('#loader-account-login-growave').replaceWith(`
    <div id="loader-account-login-growave" class="changeMessagePre">
      <div>
        <p class="title">Great, you're logging in.</p>
        <p class="message">Please return to this window once you've logged in to view your rewards program.</p>
        <p class="disclaimer">After logging in, it may take us 5 to 15 seconds to reload this page and display your account.</p>
      </div>
    </div>
  `);
};

function changeMessageAlert(){
  $('#loader-account-login-growave').replaceWith(`
    <div id="loader-account-login-growave" class="changeMessageAlert">
      <div>
        <div class="icon-loader"></div>
        <p class="title">We've detected a login.</p>
        <p class="message">We're loading your rewards information, please give us a moment.</p>
      </div>
    </div>
  `);
};


function reloadPageRewards(){

  if (reloadPageTriggered) return;
  reloadPageTriggered = true;
  
  $('#loader-account-login-growave').replaceWith(`
    <div id="loader-account-login-growave" class="reloadPageRewards">
      <div>
        <div class="icon-loader"></div>
        <p class="title">Your information is almost done loading.</p>
        <p class="message">You'll be redirected in <span id="counter">10</span> seconds...</p>
      </div>
    </div>
  `);

  let counter = 10;
  const countdown = setInterval(function() {
    counter--;
    $('#loader-account-login-growave .message #counter').text(counter);
    if (counter <= 0) {
      clearInterval(countdown);
      location.reload();
    }
  }, 1000);
};