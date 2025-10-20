/* CAMBIOS DE VARIANTES */

$(document).on("click", "product-item.product-item .product-item__general-product .variants-metafiels button.label-variant", async function () {
  let item = $(this).closest('.product-item__general-product');
  let templates = item.next('.templates-collection');
  let templateId = $(this).data('id');
  let templateElement = templates.find(`template#${templateId}`);

  if (templateElement.length) {
    let content = $(templateElement[0].content).find('.product-item__general-product');
    let newTemplateContent = content.html();

    if (item.html().trim() !== newTemplateContent.trim()) {
      item.html(newTemplateContent);
      item.find('.number-input').each(function () {
        updateButtons($(this));
      });

      let productHandle = item.find('.container-prices-b2b').attr('data-url');

      if (productHandle) {
        try {
          let variants = await fetchAllProductPrices(productHandle);
          if (variants && variants.length > 0) {
            const variant = variants[0].node;
            const wholesalePrice = Math.round(parseFloat(variant.price.amount) * 100);
            item.find('.retail span').text((wholesalePrice / 100).toLocaleString("en-US", {
              style: "currency",
              currency: variant.price.currencyCode
            }));
          }
        } catch (error) {
          console.error('Error fetching product prices:', error);
        }
      } else {
        console.error('No se encontró data-url en el item seleccionado.');
      }
    }
  } else {
    console.error(`No se encontró el template con el ID: ${templateId}`);
  }
});




/* CAMBIOS DE CANTIDAD */

$(document).on("click", "product-item.product-item .number-input button.increase", function() {
  const $container = $(this).closest('.number-input');
  const $input = $container.find('.number-input-field');
  const maxValue = parseInt($input.attr('max'));
  let currentValue = parseInt($input.val());

  if (currentValue < maxValue) {
    $input.val(currentValue + 1);
  }
  updateButtons($container);
});

$(document).on("click", "product-item.product-item .number-input button.decrease", function() {
  const $container = $(this).closest('.number-input');
  const $input = $container.find('.number-input-field');
  const minValue = parseInt($input.attr('min'));
  let currentValue = parseInt($input.val());

  if (currentValue > minValue) {
    $input.val(currentValue - 1);
  }
  updateButtons($container);
});




$(document).on("input", ".number-input-field", function () {
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






function updateButtons($container) {
  const $input = $container.find('.number-input-field');
  const $increaseButton = $container.find('.increase');
  const $decreaseButton = $container.find('.decrease');

  const currentValue = parseInt($input.val());
  const minValue = parseInt($input.attr('min'));
  const maxValue = parseInt($input.attr('max'));

  $decreaseButton.prop('disabled', currentValue <= minValue);
  $increaseButton.prop('disabled', currentValue >= maxValue);
}

$('product-item.product-item .number-input').each(function() {
  updateButtons($(this));
});




$(document).on("click", "product-item.product-item .product-item__general-product button.notes-global-collection__button", function () {
  $(this).addClass('active-button');
  $(this).siblings('.notes-global-collection__notes').slideDown();
});

$(document).on("click", "product-item.product-item .product-item__general-product button.notes-global-collection__button.active-button", function () {
  $(this).removeClass('active-button');
  $(this).siblings('.notes-global-collection__notes').slideUp();
  $(this).siblings('.notes-global-collection__notes').find('textarea').val('');
});

               








/* AGREGAR AL CARRITO */

function addToCartCollection(id) {

    const SmartCart = window.Rebuy.SmartCart;
    const $button = $(event.target);
    const $container = $button.closest('.cta-buttons-eject');
    const $input = $container.find('.number-input-field');
    const quantity = parseInt($input.val());
    const notes = $button.closest('.product-item__general-product').find('.notes-global-collection__notes textarea').val();
    const cartIcon = document.querySelector('.open-cart-rebuy');

    if (!quantity || quantity < 1) {
        console.error('Cantidad no válida');
        return;
    }

    $button.text('ADDING...');
    $button.prop('disabled', true);

    // Construir el objeto de datos para el carrito
    const data = {
        id: id,
        quantity: quantity
    };

    // Agregar la propiedad si hay notas
    if (notes && notes.trim() !== '') {
        data.properties = {
            'NOTES': notes.trim()
        };
    }

    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function() {
            SmartCart.skip_open = true;
          
            $button.text('ADDED!');


            // 🚀 INICIO DE LA ANIMACIÓN GSAP 🚀
            let flyer = document.createElement('div');
            flyer.classList.add('cart-flyer');
            document.querySelector('#main').appendChild(flyer);
            
            // 📌 Obtener posiciones inicial y final correctamente
            let btnRect = $button[0].getBoundingClientRect();
            let cartRect = cartIcon.getBoundingClientRect();
            
            // ✅ Ajustar con `window.scrollX` y `window.scrollY` para corregir el desplazamiento
            let startX = btnRect.left + btnRect.width / 2 + window.scrollX;
            let startY = btnRect.top + btnRect.height / 2 + window.scrollY;
            let endX = cartRect.left + cartRect.width / 2 + window.scrollX;
            let endY = cartRect.top + cartRect.height / 2 + window.scrollY;
            
            // 📌 Posicionar la bolita en el botón
            gsap.set(flyer, {
                position: 'absolute',
                left: `${startX}px`,
                top: `${startY}px`,
                opacity: 1
            });
            
            // 📌 Animación de la bolita hasta el carrito
            gsap.to(flyer, {
                left: `${endX}px`,
                top: `${endY}px`,
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => flyer.remove()
            });
            // 🚀 FIN DE LA ANIMACIÓN GSAP 🚀






          
            
            setTimeout(() => {
                $button.text('ADD TO CART');
                $button.prop('disabled', false);
            }, 1000);

            console.log('Producto agregado al carrito con éxito');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
            SmartCart.skip_open = true;
            $button.text('ERROR');
            setTimeout(() => {
                $button.text('ADD TO CART');
                $button.prop('disabled', false);
            }, 1000);

            console.log('Error al agregar el producto al carrito');
        }
    });
}