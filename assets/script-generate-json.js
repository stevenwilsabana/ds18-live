document.addEventListener('DOMContentLoaded', function() {
  const storefrontAccessToken = 'dec86dc3f501ef7ad05bdee7b9afe972';
  const shopifyDomain = 'ds18caraudio.myshopify.com';

  const fetchProducts = async () => {
    document.getElementById('loader').classList.add('visible');
    let products = [];
    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage) {
      const query = `
        {
          products(first: 250${cursor ? `, after: "${cursor}"` : ''}) {
            edges {
              node {
                id
                title
                handle
                onlineStoreUrl
                vendor
                images(first: 1) {
                  edges {
                    node {
                      transformedSrc
                    }
                  }
                }
                metafield(namespace: "custom", key: "user_manual") {
                  value
                }
                variants(first: 1) {
                  edges {
                    node {
                      sku
                    }
                  }
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `;

      const response = await fetch(`https://${shopifyDomain}/api/2024-01/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken
        },
        body: JSON.stringify({ query })
      });
      const data = await response.json();

      const edges = data.data.products.edges;
      products = products.concat(
        edges.map(edge => {
          const metafield = edge.node.metafield;
          const imageUrl = edge.node.images.edges[0] ? edge.node.images.edges[0].node.transformedSrc : '';
          const sku = edge.node.variants.edges[0] ? edge.node.variants.edges[0].node.sku : '';

          return {
            gid: metafield ? metafield.value : '',
            text: edge.node.title,
            productUrl: edge.node.onlineStoreUrl,
            imageUrl: imageUrl,
            sku: sku,
            vendor: edge.node.vendor
          };
        }).filter(product => product.gid)  // Filtrar productos sin GID
      );

      hasNextPage = data.data.products.pageInfo.hasNextPage;
      cursor = edges[edges.length - 1].cursor;
    }

    // Convertir GID a URLs
    const urlPromises = products.map(async product => {
      const url = await fetchUrlFromGid(product.gid, shopifyDomain, storefrontAccessToken);
      return {
        url: url,
        text: product.text,
        productUrl: product.productUrl,
        imageUrl: product.imageUrl,
        sku: product.sku,
        vendor: product.vendor
      };
    });

    const resolvedProducts = await Promise.all(urlPromises);

    const jsonResult = JSON.stringify({ files: resolvedProducts }, null, 2);
    console.log('Generated JSON:', jsonResult);

    const allResultsElement = document.createElement('script');
    allResultsElement.type = 'application/json';
    allResultsElement.id = 'all-results';
    allResultsElement.textContent = jsonResult;
    document.body.appendChild(allResultsElement);

    document.getElementById('loader').classList.remove('visible');
    document.getElementById('loader').style.display = 'none';
    document.getElementById('search-container').classList.add('visible');

    console.log('Products loaded and JSON script created');
    console.log('Total number of products:', resolvedProducts.length);
  };

  // Función para convertir GID a URL
  const fetchUrlFromGid = async (gid, shopifyDomain, storefrontAccessToken) => {
    const query = `
      {
        node(id: "${gid}") {
          ... on GenericFile {
            url
          }
        }
      }
    `;

    const response = await fetch(`https://${shopifyDomain}/api/2024-01/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    return data.data.node.url;
  };

  fetchProducts();
});
