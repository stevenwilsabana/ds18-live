// Trigger para disparar función al cambiar de filtro.

const loadingBarVariant = document.querySelector('.loading-bar');

const observerVariant = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            const currentClasses = loadingBarVariant.classList;
            if (!currentClasses.contains('is-visible')) {
              detectActiveFilters();
            }
        }
    });
});

observerVariant.observe(loadingBarVariant, { attributes: true });


// -----------------------------
// Función para detectar filtros activos

let alreadyDetected = false;

function detectActiveFilters() {
  if (alreadyDetected) return;
  alreadyDetected = true;

  setTimeout(() => {
      alreadyDetected = false;
  }, 300);

  const activeFilterInputs = document.querySelectorAll('.product-facet__filter-list .product-facet__filter-item input:checked');
  const activeFilters = [];

  activeFilterInputs.forEach(input => {
      activeFilters.push({
          value: input.value
      });
  });

  console.log('Filtros activos:', activeFilters);

  const variantContainers = document.querySelectorAll('.container-variant__content');

  variantContainers.forEach(container => {
      const variantButtons = container.querySelectorAll('button[data-details]');
      let matchedButton = null;

      for (const button of variantButtons) {
          const buttonDetails = button.getAttribute('data-details').toLowerCase();

          const hasMatch = activeFilters.some(filter => {
              const filterValue = filter.value.toLowerCase();
              return buttonDetails.includes(filterValue);
          });

          if (hasMatch) {
              matchedButton = button;
              break;
          }
      }

      if (matchedButton) {
          matchedButton.click();
          console.log('Botón seleccionado:', matchedButton);
      } else {
          console.log('No se encontró coincidencia en este producto');
      }
  });







  
}