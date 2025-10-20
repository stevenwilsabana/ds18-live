document.addEventListener('DOMContentLoaded', function() {
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
          const allResultsElement = document.getElementById('all-results');
          if (!allResultsElement) {
            console.error('No element with id "all-results" found.');
            return;
          }

          const allResults = JSON.parse(allResultsElement.textContent).files;
          console.log('All results:', allResults);

          const filteredResults = allResults.filter(result => result.text.toLowerCase().includes(query));
          console.log('Filtered results:', filteredResults);

          this.files = filteredResults;
        } catch (error) {
          console.error('Error parsing JSON or filtering results:', error);
        }
      },
      loadAllResults() {
        try {
          const allResultsElement = document.getElementById('all-results');
          if (!allResultsElement) {
            console.error('No element with id "all-results" found.');
            return;
          }

          const allResults = JSON.parse(allResultsElement.textContent).files;
          console.log('All results on load:', allResults);

          this.files = allResults;
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
});
