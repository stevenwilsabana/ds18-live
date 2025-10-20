if (window.location.href.indexOf("gift-with-purchase-wireless-audio-adapter") > -1){
    window.location.replace("https://ds18.com");
};


/* Función que nos ayuda a identificar la URL. */
function verificarParametroEnURL(nombre) {
    return new RegExp('[?&]' + nombre + '(=|&|#|$)').test(window.location.href);
};


/* Código para agregar el producto de regalo */
function agregarProductoRegalo() {
  console.log('Agregar producto de regalo "Console.log de ejemplo".');
  var data = {
    "id": 41018490028093,
    "quantity": 1
  }

  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() { 
      console.log('Producto recien agregado.');
    }
  });
};


/* Código que comprueba la cookie */
function comprobarCookieYAgregarRegalo(total,products) {

  var totalCarrito = total;
  var arrayProducts = products;

  function $product_offer(productId) {return productId.product_id === 7212568510525;};
  var $validation_product = arrayProducts.find($product_offer);

  if (document.cookie.split(';').some((item) => item.trim().startsWith('pendienteDeRegalo='))) {
    if (totalCarrito >= 15000) {
      if($validation_product === undefined){
        agregarProductoRegalo();
      } else {
        console.log('Regalo agregado con exito.');
        var $qty_product = $validation_product.quantity;
        if($qty_product >= 2){
            jQuery.post('/cart/update.js', {
              updates: {
                41018490028093: 1
              }
            });
        };
      };
    } else {
      if($validation_product === undefined){
        console.log('ALERTA: El cliente tiene la cookie pero le falta para el regalo.');
      } else {
        jQuery.post('/cart/update.js', {
          updates: {
            41018490028093: 0
          }
        });
      };
    };
  } else {
    if($validation_product === undefined){
      console.log('No tiene la cookie de regalo -> Cliente Descartado.');  
    } else {
      jQuery.post('/cart/update.js', {
        updates: {
          41018490028093: 0
        }
      });
    };
  };
};


/* Evento de Carga Rebuy */
document.addEventListener('rebuy:smartcart.ready', function(event){
  var $total_price = event.detail.smartcart.cart.total_price;
  var $array_products = event.detail.smartcart.cart.items;
  var giftWithPurchase = verificarParametroEnURL('giftwithpurchase');
  if (giftWithPurchase) {
    document.cookie = "pendienteDeRegalo=true; max-age=86400; path=/";
  };
  comprobarCookieYAgregarRegalo($total_price,$array_products);
});


/* Evento de Cambio Rebuy */
document.addEventListener('rebuy:cart.change', function(event){
  var $total_price = event.detail.cart.cart.total_price;
  var $array_products = event.detail.cart.cart.items;
  comprobarCookieYAgregarRegalo($total_price,$array_products);
});