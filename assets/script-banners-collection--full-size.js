let $divNuevoOneGlobal = null;
let $divNuevoTwoGlobal = null;

function imagesCollectionPage() {
  const $lista = $(".shopify-section--main-collection .product-list__inner");
  const $elementosLi = $lista.find(".product-item");
  const $header = $("div.new-header-collection__container");

  if (!$header.length || !$elementosLi.length) return;

  // Obtener datos de banners y links
  const bannerOne = $header.attr("data-banner-1");
  const bannerOneDg = $header.attr("data-banner-dg-1");
  const bannerOneDl = $header.attr("data-banner-dl-1");
  const bannerTwo = $header.attr("data-banner-2");
  const bannerTwoDg = $header.attr("data-banner-dg-2");
  const bannerTwoDl = $header.attr("data-banner-dl-2");
  const linkOne = $header.attr("data-link-1");
  const linkTwo = $header.attr("data-link-2");

  const showBannerOne = bannerOne && bannerOneDg && bannerOneDl;
  const showBannerTwo = bannerTwo && bannerTwoDg && bannerTwoDl;

  function buildBannerHTML(mobile, dg, dl) {
    return `
      <img class="banner-mobile" src="${mobile}">
      <img class="banner-dg" src="${dg}">
      <img class="banner-dl" src="${dl}">
    `;
  }

  // Crear una vez los banners si aún no existen
  if (!$divNuevoOneGlobal && showBannerOne) {
    const content = buildBannerHTML(bannerOne, bannerOneDg, bannerOneDl);
    $divNuevoOneGlobal = $(`
      <div class="product-item imagen-collection-page__middle imagen-collection-page__middle--1" data-id="banner-1">
        <div class="container-imagen">
          ${linkOne ? `<a target="_blank" href="${linkOne}">${content}</a>` : content}
        </div>
      </div>
    `);
  }

  if (!$divNuevoTwoGlobal && showBannerTwo) {
    const content = buildBannerHTML(bannerTwo, bannerTwoDg, bannerTwoDl);
    $divNuevoTwoGlobal = $(`
      <div class="product-item imagen-collection-page__middle imagen-collection-page__middle--2" data-id="banner-2">
        <div class="container-imagen">
          ${linkTwo ? `<a target="_blank" href="${linkTwo}">${content}</a>` : content}
        </div>
      </div>
    `);
  }

  // Ocultar banners si hay pocos productos
  if ($elementosLi.length <= 6) {
    $('.imagen-collection-page__middle').detach(); // solo lo saca del DOM sin destruirlo
    return;
  }

  // Verificar si ya están insertados
  const alreadyInsertedOne = $('.imagen-collection-page__middle[data-id="banner-1"]').length > 0;
  const alreadyInsertedTwo = $('.imagen-collection-page__middle[data-id="banner-2"]').length > 0;

  // Insertar o mantener banners según cantidad
  if ($elementosLi.length >= 7 && $elementosLi.length <= 12) {
    if (!alreadyInsertedOne && $divNuevoOneGlobal) {
      $elementosLi.eq(5).after($divNuevoOneGlobal);
    }
    $('.imagen-collection-page__middle--2').detach(); // asegurar que solo se muestre uno
  } else if ($elementosLi.length >= 13) {
    if (!alreadyInsertedOne && $divNuevoOneGlobal) {
      $elementosLi.eq(5).after($divNuevoOneGlobal);
    }
    if (!alreadyInsertedTwo && $divNuevoTwoGlobal) {
      $elementosLi.eq(11).after($divNuevoTwoGlobal);
    }
  }
}

// Ejecutar al cargar
$(document).ready(imagesCollectionPage);

// MutationObserver para carga dinámica
const loadingBar = document.querySelector(".loading-bar");

if (loadingBar) {
  let bannerAlreadyInjected = false;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === "class") {
        const classes = loadingBar.classList;
        if (!classes.contains("is-visible")) {
          imagesCollectionPage();
          bannerAlreadyInjected = false; // permitir que se reinserten en siguientes cargas
        }
      }
    });
  });

  observer.observe(loadingBar, { attributes: true });
}
