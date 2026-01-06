// /*********************** Custom JS for Boost AI Search & Discovery  ************************/

let windowWidth = 0; // Initialize the windowWidth variable to store the width.
const isMobile = () => {
  if (!windowWidth) {
    // We don't want to re-calculate the width every time because it causes a style recalculation every time.
    // So we store it
    windowWidth = window.innerWidth;

    // Calculate the width on resize
    window.addEventListener('resize', () => {
      windowWidth = window.innerWidth;
    });
  }
  return windowWidth <= 768;
};


// // Override Settings
// var boostPFSInstantSearchConfig = {
//     search: {
//         // Settings list
//         suggestionPosition: 'right' // Position the suggestion box to the left
//     }
// };

// SearchInput.prototype.customizeInstantSearch = function() {
//     // Access the suggestion popup element that is appended to the <body> tag
//     var suggestionElement = this.$uiMenuElement;
    
//     // Access the search input element
//     var searchElement = this.$element;
    
//     // Retrieve the ID of the search input box
//     var searchBoxId = this.id;

//     console.log("searchBoxId", searchBoxId)
// };


// window.__BoostCustomization__ = (window.__BoostCustomization__ || []).concat([
//   function (componentRegistry) {
//     componentRegistry.useComponentPlugin('SearchContentResult', {
//       name: 'Test Hook',
//       apply() {
//         return {
//           afterRender(element) {
//             console.log('✅ Boost Instant Search rendered', element);
//           }
//         };
//       }
//     });
//   }
// ]);

// document.addEventListener('boost-pfs-instant-search-render', function () {
//   console.log("TESTTT")
//   document
//     .querySelectorAll('.boost-sd__suggestion-queries-item--product')
//     .forEach(item => {

//       const price = item.querySelector('.boost-sd__suggestion-queries-item-price');
//       if (price) {
//         price.insertAdjacentHTML(
//           'beforeend',
//           '<span class="my-badge">Hot</span>'
//         );
//       }

//     });
// });


window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([
  (componentRegistry) => {
    const AppendISW = {
      name: "Custom ISW",
      apply() {
        return {
          afterRender(element) {
            const searchInput = document.querySelector('input.predictive-search__input').value;

            async function fetchBoostSuggest(query) {
              console.log("query", query);

              const params = new URLSearchParams({
                q: query,
                shop: Shopify.shop,          // required
                locale: Shopify.locale || 'en',
                currency: Shopify.currency?.active || 'USD',
              });

              const res = await fetch(`https://services.mybcapps.com/bc-sf-filter/search/suggest?${params.toString()}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json'
                }
              });

              if (!res.ok) {
                throw new Error('Boost suggest fetch failed');
              }

              return res.json();
            }

            fetchBoostSuggest(searchInput).then(data => {
              console.log("data", data.products);
              // let colorOptions = [];

              data.products.forEach(element => {
                const imageList = element.images

                if(element.skus.length !== 0) {
                    const skuListHtml = `
                    <div class="product-options product-options--sku">
                      <p>SKUs:</p>
                      <p>${element.skus.join(', ')}</p>
                    </div>
                    `;
        
                    const productRoot = document.querySelector(
                      `.boost-sd__instant-search-results 
                      .boost-sd__instant-search-product-list-items`
                    )?.closest('.boost-sd__instant-search-results');
        
                    if (!productRoot) return;
  
                    const targetElement = document.querySelector(`li[data-id="${element.id}"] .boost-sd__suggestion-queries-item-sku`)
                    const TargetElementOptions = document.querySelector(`li[data-id="${element.id}"] .product-options--sku`)
                    if (!TargetElementOptions) {
                      targetElement?.insertAdjacentHTML(
                        'afterend',
                        skuListHtml
                      );
                    }
                }


                element.options_with_values.forEach(option => {

                  switch (option.name) {
                    case "color":
                      option.values = option.values.map(color => {
                        if (!color.image) return color;
  
                        const imageUrl = imageList[String(color.image)];
                        if (!imageUrl) return color;
  
                        return {
                          ...color,
                          imagePosition: color.image, // optional, keep original
                          image: imageUrl
                        };
                      });
                      const colorOptions = option.values
  
                      const colorOptionHtml = `
                      <div class="product-options product-options--color">
                        <p>Available Colors:</p>
                        <ul>
                          ${colorOptions.map(color => `
                            <li class="color-option" title="${color.title}">
                              <img src="${color.image}" alt="${color.title}">
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                      `;
          
                      const productRoot = document.querySelector(
                        `.boost-sd__instant-search-results 
                        .boost-sd__instant-search-product-list-items`
                      )?.closest('.boost-sd__instant-search-results');
          
                      if (!productRoot) return;
  
                      const targetElement = document.querySelector(`li[data-id="${element.id}"] .boost-sd__suggestion-queries-item-price`)
                      const TargetElementOptions = document.querySelector(`li[data-id="${element.id}"] .product-options--color`)
                      if (!TargetElementOptions) {
                        targetElement?.insertAdjacentHTML(
                          'afterend',
                          colorOptionHtml
                        );
                      }


                      // targetElement.append(colorOptionHtml)
                      // targetElement.insertAdjacentHTML(
                      //   'afterend',
                      //   colorOptionHtml
                      // );
          
                      console.log('Found populated product group:', productRoot);
                        return;
                      break;

                    case "power_rating":
                      const powerRatingOptions = option.values
  
                      const powerRatingOptionHtml = `
                      <div class="product-options product-options--tiles product-options--power-rating">
                        <p>Available Power Ratings:</p>
                        <ul>
                          ${powerRatingOptions.map(rating => `
                            <li class="color-option" title="${rating.title}">
                              <span>${rating.title}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                      `;
          
                      const powerRatingProductRoot = document.querySelector(
                        `.boost-sd__instant-search-results 
                        .boost-sd__instant-search-product-list-items`
                      )?.closest('.boost-sd__instant-search-results');
          
                      if (!powerRatingProductRoot) return;

                      const powerRatingTargetElement = document.querySelector(`li[data-id="${element.id}"] .boost-sd__suggestion-queries-item-price`)
                      const powerRatingTargetElementOptions = document.querySelector(`li[data-id="${element.id}"] .product-options--power-rating`)
                      if (!powerRatingTargetElementOptions) {
                        powerRatingTargetElement?.insertAdjacentHTML(
                          'afterend',
                          powerRatingOptionHtml
                        );
                      }
                      return;
                    break;

                    case "size":
                      const sizeOptions = option.values
  
                      const sizeOptionHtml = `
                      <div class="product-options product-options--tiles product-options--size">
                        <p>Available Sizes:</p>
                        <ul>
                          ${sizeOptions.map(size => `
                            <li class="color-option" title="${size.title}">
                              <span>${size.title}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                      `;
          
                      const sizeProductRoot = document.querySelector(
                        `.boost-sd__instant-search-results 
                        .boost-sd__instant-search-product-list-items`
                      )?.closest('.boost-sd__instant-search-results');
          
                      if (!sizeProductRoot) return;

                      const sizeTargetElement = document.querySelector(`li[data-id="${element.id}"] .boost-sd__suggestion-queries-item-price`)
                      const sizeTargetElementOptions = document.querySelector(`li[data-id="${element.id}"] .product-options--size`)
                      if (!sizeTargetElementOptions) {
                        sizeTargetElement?.insertAdjacentHTML(
                          'afterend',
                          sizeOptionHtml
                        );
                      }
                      return;
                    break;

                    case "impedance":
                      const impedanceOptions = option.values
                      console.log("impedanceOptions", impedanceOptions)
                      const impedanceOptionHtml = `
                      <div class="product-options product-options--tiles product-options--impedance">
                        <p>Available Impedances:</p>
                        <ul>
                          ${impedanceOptions.map(impedance => `
                            <li class="color-option" title="${impedance.title}">
                              <span>${impedance.title}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                      `;
          
                      const impedanceProductRoot = document.querySelector(
                        `.boost-sd__instant-search-results 
                        .boost-sd__instant-search-product-list-items`
                      )?.closest('.boost-sd__instant-search-results');
          
                      if (!impedanceProductRoot) return;

                      const impedanceTargetElement = document.querySelector(`li[data-id="${element.id}"] .boost-sd__suggestion-queries-item-price`)
                      const impedanceTargetElementOptions = document.querySelector(`li[data-id="${element.id}"] .product-options--impedance`)
                      if (!impedanceTargetElementOptions) {
                        impedanceTargetElement?.insertAdjacentHTML(
                          'afterend',
                          impedanceOptionHtml
                        );
                      }
                      return;
                    break;
                  
                    default:
                      break;
                  }
                });
              });
            });
              



            // const widgetElm = element.getRootElm();
            // console.log("widgetElm", widgetElm);
            // if (!widgetElm || !widgetElm.innerHTML.trim()) return;

            // const drawerElm = document.querySelector("predictive-search-drawer");
            // if (!drawerElm) return;

            // const drawerRoot = drawerElm.shadowRoot || drawerElm;
            // const drawerContent = drawerRoot.querySelector(".drawer__content");
            // if (!drawerContent) return;

            // // prevent re-appending on every render
            // if (drawerContent.querySelector(".boost-sd__instant-search-results")) return;

            // // don't move Boost's original root; clone it
            // const clone = widgetElm.cloneNode(true);

            // drawerContent.innerHTML = "";
            // drawerContent.appendChild(clone);
          },
        };
      },
    };

    componentRegistry.useComponentPlugin("SearchContentResult", AppendISW);
  },
]);



window.addEventListener('load', ()=> {
  if (!isMobile()) return; // Boost 196904
  const searchIcon = document.querySelector('a.header__icon-wrapper.tap-area.hidden-lap.hidden-desk');
  const searchInput = document.querySelector('.boost-sd__search-form-input, .predictive-search__input');
  const html = document.querySelector('html');
  
  

  searchIcon.addEventListener('click', ()=> {
		searchInput?.click();
	});
  
  searchInput.addEventListener('click', ()=> {
    	html.classList.add('lock-all');
	});
  
  // on click outside
  document.addEventListener('click', function(event) {
    
  // Check if the click event target is outside of the specific element(s)
    const input = document.querySelector('.boost-sd__search-widget-init-input');
    if(!input) return;

    input.blur();
    html.classList.remove('lock-all');
    
  // if (!event.target.contains(input)) {
  //   console.log('click outside');
  //   const htmlNode = document.querySelector('html');
  // htmlNode.classList.remove('lock-all');
  // }
});



});

