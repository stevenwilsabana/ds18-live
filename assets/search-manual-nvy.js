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
            this.files = [];
            searchResults.style.display = 'none';
            noResults.style.display = 'none';
          }
        } else {
          console.error('Loader or search results element not found');
        }
      },

      // Helper para normalizar el valor del metafield link (puede venir como string, objeto o lista)
      parseManualUrl(rawValue) {
        if (!rawValue) return '';
        const raw = String(rawValue).trim();
        try {
          if (raw.startsWith('[')) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr) && arr.length) {
              return String(arr[0].url || arr[0].href || '').trim();
            }
          } else if (raw.startsWith('{')) {
            const obj = JSON.parse(raw);
            return String(obj.url || obj.href || '').trim();
          }
        } catch (e) {
          // Si no se pudo parsear, asumimos que ya es un URL plano
        }
        return raw; // caso: ya viene plano
      },

      async fetchResults(query) {
        let products = [];
        let hasNextPage = true;
        let cursor = null;

        while (hasNextPage) {
          // Usamos el nuevo metafield: custom.manual
          const gqlQuery = `
            {
              products(first: 250${cursor ? `, after: "${cursor}"` : ''}, query: "vendor:*${query.replace(/"/g, '\\"')}* OR variants.sku:*${query.replace(/"/g, '\\"')}*") {
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
                    metafield(namespace: "custom", key: "manual") {
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
          const edges = (data && data.data && data.data.products && data.data.products.edges) ? data.data.products.edges : [];

          if (edges.length === 0) {
            hasNextPage = false;
            break;
          }

          products = products.concat(
            edges.map(edge => {
              const mf = edge.node.metafield;
              const imageUrl = edge.node.images.edges[0] ? edge.node.images.edges[0].node.transformedSrc : '';
              const sku = edge.node.variants.edges[0] ? edge.node.variants.edges[0].node.sku : '';

              // *** Aquí integramos el parseo del valor del metafield link ***
              let url = this.parseManualUrl(mf && mf.value ? mf.value : '');

              // Validación básica: sólo aceptar http(s)
              if (url && !/^https?:\/\//i.test(url)) {
                url = '';
              }

              return {
                url,
                text: edge.node.title,
                productUrl: edge.node.onlineStoreUrl,
                imageUrl,
                sku,
                vendor: edge.node.vendor
              };
            }).filter(product => !!product.url) // Sólo mostrar los que tienen URL válida
          );

          hasNextPage = data.data.products.pageInfo.hasNextPage;
          cursor = edges[edges.length - 1].cursor;
        }

        // Ordenar alfabéticamente por título
        products.sort((a, b) => a.text.localeCompare(b.text));
        this.files = products;
      }
    }
  });
});
