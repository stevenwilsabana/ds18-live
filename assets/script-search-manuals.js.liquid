document.addEventListener('DOMContentLoaded', function() {
  const waitForJson = setInterval(() => {
    const allResultsElement = document.getElementById('all-results');
    if (allResultsElement) {
      clearInterval(waitForJson);  // Detener la espera una vez que el JSON esté presente
      console.log('JSON found and Vue instance is being mounted');

      new Vue({
        el: '#search-container',
        delimiters: ['[[', ']]'],
        data: {
          searchQuery: '',
          files: []
        },
        methods: {
          performSearch() {
            console.log('Performing search with query:', this.searchQuery);
            if (this.searchQuery.length > 0) {
              this.filterResults(this.searchQuery.toLowerCase());
            } else {
              this.loadAllResults();
            }
          },
          filterResults(query) {
            try {
              const allResults = JSON.parse(document.getElementById('all-results').textContent).files;
              console.log('All results:', allResults);

              // Filtrar resultados por texto o vendor
              const filteredResults = allResults.filter(result => 
                result.text.toLowerCase().includes(query) || 
                result.vendor.toLowerCase().includes(query)
              );
              console.log('Filtered results:', filteredResults);

              // Ordenar resultados filtrados alfabéticamente
              filteredResults.sort((a, b) => a.text.localeCompare(b.text));
              this.files = filteredResults;
              console.log('Files updated:', this.files);
            } catch (error) {
              console.error('Error parsing JSON or filtering results:', error);
            }
          },
          loadAllResults() {
            try {
              const allResults = JSON.parse(document.getElementById('all-results').textContent).files;
              console.log('All results on load:', allResults);

              // Ordenar todos los resultados alfabéticamente
              allResults.sort((a, b) => a.text.localeCompare(b.text));
              this.files = allResults;
              console.log('Files updated:', this.files);
            } catch (error) {
              console.error('Error parsing JSON on load:', error);
            }
          }
        },
        mounted() {
          console.log('Vue instance mounted');
          // Cargar todos los elementos al iniciar
          this.loadAllResults();
        }
      });
    }
  }, 100);  // Comprobar cada 100ms si el JSON está presente
});
