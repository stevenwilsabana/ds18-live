const storefrontAccessToken = 'a6f9f4d0ee33712b11300ae06bb9aa6c';
const graphqlEndpoint = 'https://ds18caraudio.myshopify.com/api/2024-04/graphql.json';

async function fetchProductPrices(handle, cursor = null) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      variants(first: 250, after: ${cursor ? `"${cursor}"` : null}) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }`;

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken
    },
    body: JSON.stringify({ query: query })
  });

  if (!response.ok) {
    console.error('Fetch error:', response.status, response.statusText);
    return null;
  }

  const jsonResponse = await response.json();
  //console.log('Response received:', jsonResponse);

  if (jsonResponse.errors) {
    console.error('GraphQL errors:', jsonResponse.errors);
    return null;
  }

  return jsonResponse.data.productByHandle;
}

async function fetchAllProductPrices(handle) {
  let allVariants = [];
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const product = await fetchProductPrices(handle, cursor);
    if (product && product.variants && product.variants.edges) {
      allVariants = allVariants.concat(product.variants.edges);
      hasNextPage = product.variants.pageInfo.hasNextPage;
      if (hasNextPage) {
        cursor = product.variants.edges[product.variants.edges.length - 1].cursor;
      }
    } else {
      hasNextPage = false;
    }
  }

  return allVariants;
}

async function updateProductItems() {
  const productItems = document.querySelectorAll('.container-prices-b2b[data-url]');
  const handles = Array.from(productItems).map(item => item.getAttribute('data-url'));
  const uniqueHandles = [...new Set(handles)];
  const allPromises = uniqueHandles.map(handle => fetchAllProductPrices(handle));

  const allResults = await Promise.all(allPromises);

  allResults.forEach((variants, index) => {
    if (variants && variants.length > 0) {
      const variant = variants[0].node; // Puedes cambiar esto según necesites
      const wholesalePrice = Math.round(parseFloat(variant.price.amount) * 100); // Convertir precio a entero

      productItems.forEach(item => {
        if (item.getAttribute('data-url') === uniqueHandles[index]) {
          item.querySelector('.retail span').textContent = (wholesalePrice / 100).toLocaleString("en-US", {style: "currency", currency: variant.price.currencyCode});
        }
      });
    }
  });
  
  console.log('Product items updated');
}

async function updateVariantPricesAndInitUI() {
  const productHandle = productHandleGlobal; // Asegúrate de que este handle esté correctamente definido en tu Liquid template.
  if (!productHandle) {
    console.error('Product handle is not defined');
    return;
  }

  try {
    const product = await fetchProductPrices(productHandle);
    if (product && product.variants && product.variants.edges) {
      product.variants.edges.forEach(variant => {
        const variantId = variant.node.id.split('/').pop(); // Extraer ID de la variante
        const wholesalePrice = Math.round(parseFloat(variant.node.price.amount) * 100); // Convertir precio a entero
        const variantElement = document.querySelector(`span[data-variant-id="${variantId}"]`);
        if (variantElement) {
          variantElement.setAttribute('data-price-wholesale', (wholesalePrice / 100).toLocaleString("en-US", {style: "currency", currency: "USD"}));
        }
      });
    }
    console.log('Product Prices updated:', product);
    initUI();
  } catch (error) {
    console.error('Error fetching product prices:', error);
  }
}

function initUI() {
  document.addEventListener("DOMContentLoaded", function() {
    $('.quantity-buy-container.container-uniq-form-ds .product-form__quantity').before('<div class="show-quantity" style="display:none;"><p><i class="fa-solid fa-dolly"></i><span>Availability:</span><span class="stock"></span></p></div>');
    var variantSelect = $('.product-form__buy-buttons .shopify-product-form input[name="id"]').val();
    $changeVariantEvent(variantSelect);
  });

  $('.product-form__buy-buttons .shopify-product-form input[name="id"]').change(function() {
    var variantSelect = $(this).val();
    $changeVariantEvent(variantSelect);
  });

  function $changeVariantEvent(x){
    var $selectorVariant = $('.container-general-prices__ab-test-prices .variants-prices-script').find('span[data-variant-id=' + x + ']');
    var $id = $($selectorVariant).attr('data-variant-id');
    var $available = $($selectorVariant).attr('data-available');
    var $quantity = $($selectorVariant).attr('data-quantity');
    var $priceRegular = $($selectorVariant).attr('data-price-regular');
    var $priceCrossed = $($selectorVariant).attr('data-price-crossed');
    var $priceRetail = $($selectorVariant).attr('data-price-wholesale');
    var $priceDealer = $($selectorVariant).attr('data-price-dealer');
    var $containerDealer = $('.prices-b2b-pdp .dealer');

    if ($available == 'false'){
      $('.product-form .show-quantity .stock').text('0 Items');
      $('.container-back-in-stock__klaviyo').show();
      $('.container-general-prices').addClass('hiden-prices-sold-out');
      setTimeout(function() {$('#StickyAddToCart .loader-button__text').html('Sold Out<b> - ' + $priceCrossed + '</b>');}, 500);
    } else {
      if($quantity <= 0){

        let $form = $('.product__info_continer .product-form');
        let hasAvailabilityAttr = typeof $form.attr('data-availability') !== 'undefined';
        if (hasAvailabilityAttr) {
          $('.product-form .show-quantity .stock').text('BACKORDER');
        } else {
          $('.product-form .show-quantity .stock').text('10,000 Items');
        }
        
      } else if ($quantity == 1){
        $('.product-form .show-quantity .stock').text('1 Item');
      } else if ($quantity > 1){
        $('.product-form .show-quantity .stock').text($quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Items');
      }
      
      $('.container-back-in-stock__klaviyo').hide();
      $('.container-general-prices').removeClass('hiden-prices-sold-out');
      setTimeout(function() {$('#StickyAddToCart .loader-button__text').html('Add to Cart<b> - ' + $priceCrossed + '</b>');}, 500);
    }

    $('.prices-b2b-pdp .wholesale span').text($priceCrossed);
    $('.prices-b2b-pdp .retail span').text($priceRetail);

    if($priceCrossed == $priceRetail){
      $('.prices-b2b-pdp .retail').hide();
    } else {
      $('.prices-b2b-pdp .retail').css('display','flex');
    }

    if ($priceDealer) {
      if ($containerDealer.length) {
        $('.prices-b2b-pdp .dealer span').text($priceDealer);
      } else {
        $('.prices-b2b-pdp .wholesale').after('<p class="dealer"><b>Dealer: </b><span>' + $priceDealer + '</span></p>');
      }
    } else {
      if ($containerDealer.length) {
        $containerDealer.remove();
      }
    }
    

    $('.container-general-prices__ab-test-prices .container-prices .crossed-out-price .price').text($priceCrossed);
    $('.container-general-prices__ab-test-prices .container-prices .price-regular .price').text($priceRegular);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await updateVariantPricesAndInitUI();
});

window.addEventListener('load', async () => {
  await updateProductItems();
});
