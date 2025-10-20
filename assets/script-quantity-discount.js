$(document).ready(function () {
  function updateQuantityRadioValueFromInput() {
    const $radio = $('#quantity-discount-4');
    const $input = $radio.closest('.quantity-discount__item').find('.quantity-input');
    const newValue = parseInt($input.val()) || 3;
    $radio.val(newValue);
  }


  /*
  function updateSelectorTwoThree(selector){
    if (selector.attr('id') === 'quantity-discount-2' || selector.attr('id') === 'quantity-discount-3') {
      $('.quantity-discount__item.quantity-discount__item--pair-three').addClass('active');
    } else {
      $('.quantity-discount__item.quantity-discount__item--pair-three').removeClass('active');
    }
  }*/
  

  function syncSelectedRadioToSelectorInput() {
    const $selected = $('input[name="quantity-discount"]:checked');
    const $selectorInput = $('quantity-selector.quantity-selector input.quantity-selector__input');

    if ($selected.attr('id') === 'quantity-discount-4') {
      const $manualInput = $selected.closest('.quantity-discount__item').find('.quantity-input');
      $selectorInput.val($manualInput.val());
    } else {
      $selectorInput.val($selected.val());
    }
  }

  /*function updatePriceDisplay() {
    const $radio = $('#quantity-discount-4');
    const priceCents = parseInt($radio.data('price')); // Ej: 5295
    const quantity = parseInt($('.quantity-input').val()) || 3;
  
    // const totalCents = priceCents * quantity;
    const totalCents = priceCents;
    const discountedCents = Math.round(totalCents * 0.93); // 15% OFF
  
    const totalFormatted = formatCurrency(totalCents / 100); // 52.95 * 4
    const discountFormatted = formatCurrency(discountedCents / 100);
  
    const $label = $('label[for="quantity-discount-4"]');
    $label.find('.prices .regular').text(totalFormatted);
    $label.find('.prices .offert').text(discountFormatted);
  }*/
  
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }


  $('.quantity-control .quantity-input').on('input change blur', function () {
    updateQuantityRadioValueFromInput();
    // updatePriceDisplay();
    if ($('#quantity-discount-4').is(':checked')) {
      syncSelectedRadioToSelectorInput();
    }
  });


  $('input[name="quantity-discount"]').on('change', function () {
    // updatePriceDisplay();
    if ($(this).attr('id') === 'quantity-discount-4') {
      updateQuantityRadioValueFromInput();
    }
    // updateSelectorTwoThree($(this));
    syncSelectedRadioToSelectorInput();
  });



  /*
  $(document).on('click', '.quantity-discount__item.quantity-discount__item--pair-three', function () {
    if (!$(this).hasClass('active')) {
      $('#quantity-discount-2').prop('checked', true).trigger('change');
    }
  });*/



  $('.quantity-control').each(function () {
    const $container = $(this);
    const $input = $container.find('.quantity-input');
    const $btnPlus = $container.find('.quantity-plus');
    const $btnMinus = $container.find('.quantity-minus');
    const min = parseInt($input.attr('min'));
    const max = parseInt($input.attr('max'));
    const step = parseInt($input.attr('step')) || 1;

    function updateButtonsState(value) {
      $btnMinus.prop('disabled', value <= min);
      $btnPlus.prop('disabled', value >= max);
    }

    function validateInputValue() {
      let value = parseInt($input.val());
      if (isNaN(value) || value < min) value = min;
      if (value > max) value = max;
      $input.val(value);
      updateButtonsState(value);
    }

    $btnPlus.on('click', function () {
      let val = parseInt($input.val()) || min;
      let newVal = Math.min(val + step, max);
      $input.val(newVal).trigger('change');
      updateButtonsState(newVal);
    });

    $btnMinus.on('click', function () {
      let val = parseInt($input.val()) || min;
      let newVal = Math.max(val - step, min);
      $input.val(newVal).trigger('change');
      updateButtonsState(newVal);
    });

    $input.on('blur change', function () {
      validateInputValue();
    });

    $input.on('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
      let val = parseInt(this.value);
      if (isNaN(val)) return;
      const min = parseInt($(this).attr('min'));
      const max = parseInt($(this).attr('max'));
      if (val < min) {
        this.value = min;
      } else if (val > max) {
        this.value = max;
      }
      // Opcional: actualizar botones y valores relacionados en tiempo real
      updateButtonsState(parseInt(this.value));
      updateQuantityRadioValueFromInput();
      // updatePriceDisplay();
      if ($('#quantity-discount-4').is(':checked')) {
        syncSelectedRadioToSelectorInput();
      }
    });


    validateInputValue();
  });

  syncSelectedRadioToSelectorInput();
  
});
