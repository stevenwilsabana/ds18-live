$(document).ready(function() {
  const $productContainer = $('.shopify-section--main-collection');

  const savedGridStyle = localStorage.getItem('gridStyle') || 'grid-4';
  $productContainer.addClass(savedGridStyle);

  $(document).on('click','.grid-toggle-container .grid-toggle',function() {
    if ($productContainer.hasClass('grid-4')) {
      $productContainer.removeClass('grid-4').addClass('grid-1');
      localStorage.setItem('gridStyle', 'grid-1');
    } else {
      $productContainer.removeClass('grid-1').addClass('grid-4');
      localStorage.setItem('gridStyle', 'grid-4');
    }
  });

});