document.addEventListener('DOMContentLoaded', function() {
  const storefrontAccessToken = 'dec86dc3f501ef7ad05bdee7b9afe972';
  const shopifyDomain = 'ds18caraudio.myshopify.com';

  new Vue({
    el: '#search-container',
    delimiters: ['[[', ']]'],
    data: {
      searchQuery: '',
      files: [],
      isLoading: false
    },
    methods: {
      async performSearch() {
        console.log('Performing search with query:', this.searchQuery);
        const loader = document.getElementById('loader');
        const searchResults = document.getElementById('search-results');
        const noResults = document.getElementById('no-results');

        if (loader && searchResults && noResults) {
          if (this.searchQuery.length > 0) {
            this.isLoading = true;
            loader.style.display = 'block';
            searchResults.style.display = 'none';
            noResults.style.display = 'none';
            await this.fetchResults(this.searchQuery.toLowerCase());
            this.isLoading = false;
            loader.style.display = 'none';
            if (this.files.length > 0) {
              searchResults.style.display = 'block';
            } else {
              noResults.style.display = 'block';
            }
          } else {
            this.files = [];  // Clear results if the query is empty
            searchResults.style.display = 'none';
            noResults.style.display = 'none';
          }
        } else {
          console.error('Loader or search results element not found');
        }
      },
      async fetchResults(query) {
        let products = [];
        let hasNextPage = true;
        let cursor = null;

        while (hasNextPage) {
          const gqlQuery = `
            {
              products(first: 250${cursor ? `, after: "${cursor}"` : ''}, query: "title:*${query.replace(/"/g, '\\"')}* OR vendor:*${query.replace(/"/g, '\\"')}* OR variants.sku:*${query.replace(/"/g, '\\"')}*") {
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
            body: JSON.stringify({ query: gqlQuery })
          });

          const data = await response.json();
          const edges = data.data.products.edges;

          if (edges.length === 0) {
            hasNextPage = false;
            break;
          }

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
          cursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
        }

        // Convertir GID a URLs
        const urlPromises = products.map(async product => {
          const url = await this.fetchUrlFromGid(product.gid);
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

        // Sort results alphabetically
        resolvedProducts.sort((a, b) => a.text.localeCompare(b.text));
        this.files = resolvedProducts;
      },
      async fetchUrlFromGid(gid) {
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
        return data.data.node ? data.data.node.url : null;
      }
    }
  });
});
