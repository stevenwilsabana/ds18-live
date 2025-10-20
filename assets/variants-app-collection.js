function renderVariants(item, id){
  $(item).find('.boost-sd__product-item-grid-view-layout-image').after('<div class="boost-sd__product-variants"></div>');
  getProduct(id, item);
}

function getProduct(id, item) {
  var productId = 'gid://shopify/Product/' + id;
  var query = `
    {
      product(id: "${productId}") {
        channelVariantsMetafield: metafield(namespace: "custom", key: "channel_variants") {
          value
        }
        voltmeterVariantsMetafield: metafield(namespace: "custom", key: "voltmeter_variants") {
          value
        }
      }
    }
  `;

  fetch('https://ds18caraudio.myshopify.com/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '7629b09f6cbcb1299b72aba81528119b'
    },
    body: JSON.stringify({ query: query })
  })
  .then(response => response.json())
  .then(data => {
    const productMetafields = data.data.product;
    if (productMetafields) {
      const fetchPromises = [];
      const productGroups = {};
      Object.entries(productMetafields).forEach(([metafieldName, metafield]) => {
        if (metafield && metafield.value) {
          const productIds = JSON.parse(metafield.value);
          productGroups[metafieldName] = [];
          productIds.forEach(productId => {
            fetchPromises.push(fetchProductDetails(productId, productGroups, metafieldName));
          });
        }
      });
      Promise.all(fetchPromises).then(() => {
        displayProductImages(productGroups, item);
      });
    }
  })
  .catch(error => console.error('Error al obtener información del producto:', error));
}

function fetchProductDetails(productId, productGroups, metafieldName) {
  var query = `
    {
      product(id: "${productId}") {
        title
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        channel: metafield(namespace: "custom", key: "channel") {
          value
        }
        voltmeter: metafield(namespace: "custom", key: "voltmeter") {
          value
        }
      }
    }
  `;

  return fetch('https://ds18caraudio.myshopify.com/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '7629b09f6cbcb1299b72aba81528119b'
    },
    body: JSON.stringify({ query: query })
  })
  .then(response => response.json())
  .then(data => {
    console.log('🟢🟢 Respuesta de la solicitud GraphQL:', data);
    let productDetails = data.data.product;
    productGroups[metafieldName].push(productDetails);
  })
  .catch(error => console.error('Error al obtener detalles del producto:', error));
}

function displayProductImages(productGroups, item) {
  Object.entries(productGroups).forEach(([group, products]) => {
    let groupDiv = $('<div class="product-group"></div>');
    products.forEach(product => {
      let imgSrc = product.images.edges[0].node.originalSrc;
      let imgAlt = product.images.edges[0].node.altText || 'Product Image';
      let channelValue = product.channel ? product.channel.value : "N/A";
      let voltmeterValue = product.voltmeter ? product.voltmeter.value : "N/A";
      let divContent = `
        <div class="item-variant" data-image="${imgSrc}" data-title="${product.title}">
          <p>Channel: ${channelValue}</p>
          <p>Voltmeter: ${voltmeterValue}</p>
        </div>`;
      groupDiv.append(divContent);
    });
    $(item).find('.boost-sd__product-variants').append(groupDiv);
  });
}









/* Script cuando carga BOOTS */

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.classList.contains('boost-sd-container')) {

            setTimeout(function() {
              $('.boost-sd__product-item').each(function(){
                var id = $(this).attr('data-product-id');
                renderVariants($(this), id);
              });
            }, 1000);

            observer.disconnect();
            return;
          }
        }
      }
    }
  });
  
  const config = { childList: true, subtree: true };
  const targetNode = document.querySelector('.boost-sd__filter-block');
  observer.observe(targetNode, config);



/* Script cuando se cambian filtros en BOOTS */

  function $GloboLoad(mutationsList, $observerGlobo) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if ($(mutation.target).is('.boost-sd-container .boost-sd__product-list')) {
          
          $('.boost-sd__product-item').each(function(){
            var id = $(this).attr('data-product-id');
            renderVariants($(this), id);
          });

          
        }
      }
    }
  };
  
  const $observerGlobo = new MutationObserver($GloboLoad);
  const $configGlobo = { childList: true, subtree: true };
  $observerGlobo.observe(document.body, $configGlobo);