document.addEventListener("DOMContentLoaded", function() {

  $(".complete-the-look__products .ctl-product:lt(3)").css("display", "flex");
    
});



/* CAMBIOS DE CANTIDAD */

$(document).on("click", ".complete-the-look .ctl-product__info-button .number-input button.increase", function() {
  const $container = $(this).closest('.number-input');
  const $input = $container.find('.number-input-field');
  const maxValue = parseInt($input.attr('max'));
  let currentValue = parseInt($input.val());

  if (currentValue < maxValue) {
    $input.val(currentValue + 1);
  }
  updateButtonsCompleteYourSystem($container);
});

$(document).on("click", ".complete-the-look .ctl-product__info-button .number-input button.decrease", function() {
  const $container = $(this).closest('.number-input');
  const $input = $container.find('.number-input-field');
  const minValue = parseInt($input.attr('min'));
  let currentValue = parseInt($input.val());

  if (currentValue > minValue) {
    $input.val(currentValue - 1);
  }
  updateButtonsCompleteYourSystem($container);
});




$(document).on("input", ".complete-the-look .ctl-product__info-button .number-input-field", function () {
  const $input = $(this);
  const $container = $input.closest('.number-input');
  const $increaseButton = $container.find('.increase');
  const $decreaseButton = $container.find('.decrease');

  const maxValue = parseInt($input.attr('max'));
  let currentValue = parseInt($input.val());

  if (isNaN(currentValue) || $input.val() === "") {
    currentValue = 1;
    $input.val(currentValue);
  }

  if (currentValue > maxValue) {
    $input.val(maxValue);
  } else if (currentValue < 1) {
    $input.val(1);
  }

  const updatedValue = parseInt($input.val());

  $decreaseButton.prop('disabled', updatedValue <= 1);
  $increaseButton.prop('disabled', updatedValue >= maxValue);
});






function updateButtonsCompleteYourSystem($container) {
  const $input = $container.find('.number-input-field');
  const $increaseButton = $container.find('.increase');
  const $decreaseButton = $container.find('.decrease');

  const currentValue = parseInt($input.val());
  const minValue = parseInt($input.attr('min'));
  const maxValue = parseInt($input.attr('max'));

  $decreaseButton.prop('disabled', currentValue <= minValue);
  $increaseButton.prop('disabled', currentValue >= maxValue);
}



$('p.complete-the-look .ctl-product__info-button .number-input').each(function() {
  updateButtonsCompleteYourSystem($(this));
});






/* AGREGAR AL CARRITO */

function addToCartCollectionCompleteYourSystem() {
  
  const $button = $(event.target);
  const $container = $button.closest('.ctl-product__info-button');
  const $input = $container.find('.number-input-field');
  const quantity = parseInt($input.val());
  var $select = $button.parents('.ctl-product__info').find('.ctl-product__info-variant select');
  var $id = $select.val();

  if (!quantity || quantity < 1) {
    console.error('Cantidad no válida');
    return;
  }

  $button.text('ADDING...');
  $button.prop('disabled', true);

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: {
      id: $id,
      quantity: quantity
    },
    dataType: 'json',
    success: function() {
      $button.text('ADDED!');
      
      setTimeout(() => {
        $button.text('ADD TO CART');
        $button.prop('disabled', false);
      }, 1000);

      console.log('Productos agregados al carrito con éxito');
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      $button.text('ERROR');
      setTimeout(() => {
        $button.text('ADD TO CART');
        $button.prop('disabled', false);
      }, 1000);

      console.log('Error al agregar los productos al carrito');
    }
  });
}
