document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("collection-search-input");
    const searchResultsContainer = document.querySelector("#collection-search-results .product-list__inner");
    const searchResultsCount = document.querySelector("#collection-search-results .product-facet__meta-bar-item--count");
    const collectionProducts = document.getElementById("facet-main");
    const filterContainer = document.getElementById("facet-filters");
    const STOREFRONT_API_TOKEN = "7662b9fe391aa8637b49ce1cb4cf91df";

    const mobileFilters = document.querySelector("div#mobile-facet-toolbar div#block-filters-mobile");
    const desktopFilters = document.querySelector(".shopify-section--main-collection .product-facet__aside div#block-filters-desktop");

    async function searchProducts(query) {
        if (query.length > 0) {
            mobileFilters.style.display = "block";
            desktopFilters.style.display = "block";
        } else {
            mobileFilters.style.display = "none";
            desktopFilters.style.display = "none";
        }


        if (query.length < 3) {
            console.clear();
            searchResultsContainer.innerHTML = "";
            collectionProducts.style.display = "block";
            filterContainer.classList.remove("filters-disabled");
            document.getElementById("collection-search-results").style.display = "none"; 
            history.replaceState({}, "", window.location.pathname);
            return;
        }

        let storeDomain = window.location.hostname;
        let graphqlEndpoint = `https://${storeDomain}/api/2024-04/graphql.json`;

        let allProducts = [];
        let cursor = null;
        let hasNextPage = true;

        // let escapedQuery = query.replace(/["\\]/g, '\\$&');
        // let escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\./g, '\\.');



        while (hasNextPage) {
            
            let queryGraphQL = `
            {
                products(first: 250, query: "vendor:*${escapedQuery}*"${cursor ? `, after: "${cursor}"` : ""}) {
                    edges {
                        node {
                            id
                            title
                            handle
                            vendor
                            availableForSale
                            featuredImage { url width height id }
                            images(first: 5) { edges { node { url width height id } } }
                            variants(first: 5) {
                                edges {
                                    node {
                                        id
                                        title
                                        availableForSale
                                        priceV2 { amount currencyCode }
                                        compareAtPriceV2 { amount currencyCode }
                                        barcode
                                        quantityAvailable
                                    }
                                }
                            }
                            metafields(identifiers: [
                              { namespace: "custom", key: "b2b_m_c" },
                              { namespace: "custom_fields", key: "product_description" },
                              { namespace: "prod", key: "each_pair_text" },
                              { namespace: "custom", key: "disabled_product_out_of_stock_b2b" }
                            ]) {
                              key
                              value
                            }
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }`;

            try {
                let response = await fetch(graphqlEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": STOREFRONT_API_TOKEN
                    },
                    body: JSON.stringify({ query: queryGraphQL })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let data = await response.json();
                if (data.errors) {
                    // console.error("❌ Error en la API de Shopify:", data.errors);
                    return;
                }

                let products = data.data.products.edges.map(edge => {
                    let product = edge.node;

                    //console.log(`📌 Producto: ${product.title}`);
                    //console.log(`🔍 Metacampo product_description:`, product.metafield ? (product.metafield.value || "🔴 Metacampo vacío") : "❌ No encontrado

                    // Extraer metacampos en un objeto
                    let metafields = {};
                    if (product.metafields && Array.isArray(product.metafields)) {
                          product.metafields.forEach(metafield => {
                              if (metafield && metafield.key) {
                                  metafields[metafield.key] = metafield.value;
                              }
                          });
                      }


                    let productDescription = metafields["product_description"] || null;
                    let eachPairText = metafields["each_pair_text"] || null;
                    let b2bMC = metafields["b2b_m_c"] 
                    ? Array.isArray(JSON.parse(metafields["b2b_m_c"])) 
                        ? JSON.parse(metafields["b2b_m_c"]).join(", ") 
                        : metafields["b2b_m_c"]
                    : null;
                  
                  
                    // LOG PARA VER QUÉ METACAMPOS ESTAMOS OBTENIENDO
                    /*console.log("📌 Producto:", product.title);
                    console.log("📌 Metacampos recibidos:", product.metafields);
                    console.log("🔍 Metacampo product_description:", productDescription || "❌ No encontrado");
                    console.log("🔍 Metacampo eachPairText:", eachPairText || "❌ No encontrado");*/

                  
                    return {
                        id: product.id,
                        title: product.title,
                        handle: product.handle,
                        vendor: product.vendor,
                        available: product.availableForSale,
                        featuredImage: product.featuredImage,
                        images: product.images.edges.map(img => img.node),
                        variants: product.variants.edges.map(variant => ({
                            id: variant.node.id,
                            title: variant.node.title,
                            available: variant.node.availableForSale,
                            price: variant.node.priceV2.amount,
                            compareAtPrice: variant.node.compareAtPriceV2 ? variant.node.compareAtPriceV2.amount : null,
                            barcode: variant.node.barcode || null,
                            inventory_quantity: variant.node.quantityAvailable !== null && variant.node.quantityAvailable !== undefined ? variant.node.quantityAvailable : 0
                        })),
                        productDescription: productDescription,
                        eachPairText: eachPairText,
                        b2bMC: b2bMC,
                        disabledOutOfStockB2B: metafields["disabled_product_out_of_stock_b2b"] === "true"
                    };
                });

                products = products.filter(product =>
                    product.vendor.toLowerCase().includes(query.toLowerCase())
                );
    
                products.sort((a, b) => a.vendor.localeCompare(b.vendor));


                allProducts = allProducts.concat(products);
                hasNextPage = data.data.products.pageInfo.hasNextPage;
                cursor = data.data.products.pageInfo.endCursor;

            } catch (error) {
                // console.error("⚠️ Error al obtener los productos:", error);
                return;
            }
        }

        if (allProducts.length > 0) {
            // console.log("🔍 Productos encontrados:", allProducts);
            displaySearchResults(allProducts);
            searchResultsCount.innerHTML = `${allProducts.length} product${allProducts.length > 1 ? 's' : ''} found`;
            document.getElementById("collection-search-results").style.display = "block";
            searchResultsContainer.style.display = "grid";
            collectionProducts.style.display = "none";
        } else {
            // console.log("⚠️ No se encontraron productos para:", query);
            searchResultsCount.innerHTML = `No products found for "<strong>${query}</strong>".`;
            document.getElementById("collection-search-results").style.display = "block"; 
            searchResultsContainer.style.display = "none";
            collectionProducts.style.display = "none";
        }
    }

    function generateImageAttributes(image) {
        let sizes = [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
        let srcset = sizes.map(size => `${image.url.replace(/(\.\w+)$/, `_${size}x$1`)} ${size}w`).join(', ');
        let aspectRatio = image.width / image.height;

        return {
            src: image.url.replace(/(\.\w+)$/, `_1200x$1`),
            srcset,
            sizes: "(max-width: 740px) calc(50vw - 24px), calc((min(100vw - 80px, 1520px) - 305px) / 4 - 18px)",
            width: image.width,
            height: image.height,
            aspectRatio
        };
    }

    function renderProductImages(product) {
        if (!product.featuredImage) return "";

        let mainImage = generateImageAttributes(product.featuredImage);
        let secondImage = product.images.length > 1 ? generateImageAttributes(product.images[1]) : null;

        return `
        <a href="/products/${product.handle}" class="product-item__aspect-ratio aspect-ratio" 
           style="padding-bottom: ${100.0 / mainImage.aspectRatio}%; --aspect-ratio: ${mainImage.aspectRatio}">
            
            <img class="product-item__primary-image" loading="lazy" 
                data-media-id="${product.featuredImage.id}" 
                src="${mainImage.src}" 
                srcset="${mainImage.srcset}" 
                sizes="${mainImage.sizes}" 
                width="${mainImage.width}" 
                height="${mainImage.height}" 
                alt="${product.title}">

            ${secondImage ? `
            <img class="product-item__secondary-image" loading="lazy" 
                data-media-id="${product.images[1].id}" 
                src="${secondImage.src}" 
                srcset="${secondImage.srcset}" 
                sizes="${secondImage.sizes}" 
                width="${secondImage.width}" 
                height="${secondImage.height}" 
                alt="${product.title} - Secondary">
            ` : ""}
        </a>`;
    }

    function getPriceFromStorage(handle) {
        let storedProducts = JSON.parse(localStorage.getItem("b2bPrices")) || [];
        return storedProducts.find(product => product.handle === handle) || null;
    }

    function renderProductItem(product) {
        let selectedVariant = product.variants.find(v => v.available) || product.variants[0];



        let totalInventory = product.variants.reduce((total, variant) => {
            return total + (variant.available 
                ? (variant.inventory_quantity !== undefined && variant.inventory_quantity !== null 
                    ? variant.inventory_quantity 
                    : 10000) 
                : 0);
        }, 0);

        if (product.available && product.disabledOutOfStockB2B) {
          totalInventory = 10000;
        }

      
        if (totalInventory === 0) totalInventory = 1;



        let variantId = selectedVariant.id.replace("gid://shopify/ProductVariant/", "");
      
      
      
        let price = selectedVariant.price;
        let compareAtPrice = selectedVariant.compareAtPrice;


        let priceDisplay = (price !== null && price !== undefined && !isNaN(price))
            ? `$${parseFloat(price).toFixed(2)}`
            : "Loading...";
    
        let compareAtPriceDisplay = (compareAtPrice !== null && compareAtPrice !== undefined && !isNaN(compareAtPrice))
            ? `$${parseFloat(compareAtPrice).toFixed(2)}`
            : null;


      
        let discountLabel = compareAtPrice && price < compareAtPrice ? `<span class="label label--highlight">${Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% OFF</span>` : "";
        let productLabels = !product.available ? `<span class="label label--subdued">Sold Out</span>` : "";

        let hasDescription = product.productDescription && product.productDescription.trim() !== "";
        let productDescriptionHTML = hasDescription ? `<p class="product-description">${product.productDescription}</p>` : "";

        let sku = selectedVariant.sku || product.vendor;
        let skuHTML = `<a class="product-item-meta__vendor heading heading--xsmall" href="/products/${product.handle}">SKU: ${sku}</a>`;

        let barcode = selectedVariant.barcode || null;
        let barcodeHTML = barcode ? `<a class="product-item-meta__upc" href="/products/${product.handle}"><b>UPC:</b> ${barcode}</a>` : "";


      
        let eachPairText = product.eachPairText ? `<i> / ${product.eachPairText}</i>` : "";
        

        let storedProduct = getPriceFromStorage(product.handle);
        let yourPrice = storedProduct && storedProduct.your_price
            ? storedProduct.your_price
            : priceDisplay;
    
        let dealerPrice = storedProduct && storedProduct.dealer_price
            ? storedProduct.dealer_price
            : compareAtPriceDisplay || null;
    
        let pricesHTML = `
            <div class="container-prices-b2b" data-url="${product.handle}">
                <p class="wholesale">Your Price:<span>${yourPrice}</span>${eachPairText}</p>
                ${dealerPrice ? `<p class="dealer">Dealer:<span>${dealerPrice}</span>${eachPairText}</p>` : ""}
                <p class="retail">Retail:<span>${priceDisplay}</span>${eachPairText}</p>
            </div>
        `;


        let notesHTML = product.available
        ? `
        <div class="notes-global-collection">
            <button class="notes-global-collection__button"><i class="fa-solid fa-plus"></i> Add a note to this product.</button>
            <div class="notes-global-collection__notes">
                <textarea placeholder="Any special instructions or notes for this product?"></textarea>
            </div>
        </div>
        `
        : "";



        let ctaButtonsHTML = `
        <div class="cta-buttons-eject">
            <div class="number-input">
                <button class="decrease" type="button">-</button>
                <input class="number-input-field" type="number" min="1" max="${totalInventory}" value="1" ${!product.available ? "readonly" : ""}/>
                <button class="increase" type="button">+</button>
            </div>

            ${product.available
                ? `
                <button class="btn btn--add-to-cart" onclick="addToCartCollection(${variantId})">ADD TO CART</button>
                `
                : `<button disabled class="btn btn--sold-out">SOLD OUT</button>`
            }

            <div class="gw-add-to-wishlist-product-card-placeholder gw-add-to-wishlist-product-card-placeholder--desktop" 
                    data-gw-product-id="${product.id}" 
                    data-gw-variant-id="${selectedVariant.id}">
                </div>
        </div>
    `;


      let formattedNumber = totalInventory.toLocaleString("en-US");
      let fullInventoryHTML = product.available
        ? `
        <div class="container-full-inventory">
            ${product.b2bMC 
                ? `<p class="full-mc"><b><i class="fa-solid fa-box"></i> M/C: </b><span> ${product.b2bMC}</span></p>
                   <div class="line-divisor"></div>` 
                : ""}
    
            <p class="full-inventory"><b><i class="fa-solid fa-dolly"></i> Available:</b><span> ${product.disabledOutOfStockB2B ? 'BACKORDER' : formattedNumber}</span></p>
        </div>
        `
        : "";


      

        return `
        <product-item class="product-item-b2b product-item product-item--custom-wholesale ${!product.available ? "product-item--sold-out" : ""}">
            <div class="product-item__general-product" ${product.available ? "style='position: relative;'" : ""}>
                
                <div class="gw-add-to-wishlist-product-card-placeholder gw-add-to-wishlist-product-card-placeholder--mobile" 
                    data-gw-product-id="${product.id}" 
                    data-gw-variant-id="${selectedVariant.id}">
                </div>
                
                <div class="product-item__image-wrapper ${product.images.length > 1 ? "product-item__image-wrapper--multiple" : ""}">
                    <div class="product-item__label-list label-list">
                        ${productLabels}
                        ${discountLabel}
                    </div>
                    ${renderProductImages(product)}
                </div>

                <div class="product-item__info ${hasDescription ? 'product-item__info-with-description' : ''}">
                    <div class="product-item-meta">
                        <div class="product-item-b2b__container-title">
                          ${skuHTML}
                          <a class="product-item-meta__title" href="/products/${product.handle}">${product.title}</a>
                          ${barcodeHTML}
                        </div>

                        <div class="product-item-b2b__container-prices">
                          ${pricesHTML}
                        </div>

                         <div class="product-item-b2b__container-cta">
                            ${notesHTML}
                            ${ctaButtonsHTML}
                            ${fullInventoryHTML}
                        </div>

                        
                    </div>
                </div>
            </div>
        </product-item>
        `;
    }

    function displaySearchResults(products) {
        searchResultsContainer.innerHTML = products.map(product => renderProductItem(product)).join("");
        document.getElementById("collection-search-results").style.display = "block";
        collectionProducts.style.display = "none";
    }

    if(searchInput){
      searchInput.addEventListener("input", function () {
        searchProducts(this.value.trim());
      });  
    };
    
});
