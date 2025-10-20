document.addEventListener("DOMContentLoaded", function () {
    const collectionURL = "https://ds18.com/collections/shop-all";
    let isFetching = false;
    let totalPages = 50; // Número estimado de páginas (ajústalo si es necesario)
    let concurrentRequests = 5; // 🔥 Número de peticiones en paralelo

    function getStoredData() {
        try {
            return JSON.parse(localStorage.getItem("b2bPrices")) || [];
        } catch (e) {
            // console.warn("⚠️ Error accediendo a localStorage.");
            return [];
        }
    }

    function saveDataToStorage(products) {
        try {
            localStorage.setItem("b2bPrices", JSON.stringify(products));
            localStorage.setItem("b2bProductsTotal", products.length);
        } catch (e) {
            // console.warn("⚠️ Error guardando en localStorage.");
        }
    }

    async function fetchPage(page) {
        try {
            let response = await fetch(`${collectionURL}?page=${page}`);
            let text = await response.text();
            let parser = new DOMParser();
            let doc = parser.parseFromString(text, "text/html");

            let productElements = doc.querySelectorAll("product-item.product-item-b2b .product-item-b2b__container-prices");

            if (productElements.length === 0) {
                return [];
            }

            return Array.from(productElements).map(el => ({
                handle: el.getAttribute("data-handle"),
                your_price: el.getAttribute("data-your-price"),
                dealer_price: el.getAttribute("data-dealer")
            }));
        } catch (error) {
            // console.error(`❌ Error al obtener la página ${page}:`, error);
            return [];
        }
    }

    async function fetchAllCollectionProducts(startPage = 1) {
        if (isFetching) {
            // console.log("⏳ Ya se está ejecutando una carga, evitando duplicación...");
            return;
        }
        isFetching = true;

        let allProducts = getStoredData();
        let storedProductCount = parseInt(localStorage.getItem("b2bProductsTotal") || "0", 10) || window.totalCollectionProducts || 0;
        let pagesToFetch = Array.from({ length: totalPages }, (_, i) => i + startPage);
        let fetchedPages = 0;

        // console.log(`🔄 Iniciando carga de productos desde la página ${startPage} con carga paralela.`);

        while (fetchedPages < totalPages) {
            let batch = pagesToFetch.splice(0, concurrentRequests); // 🔥 Tomar 5 páginas por lote
            let results = await Promise.all(batch.map(fetchPage)); // 🔥 Fetch paralelo

            results.forEach(productsOnPage => {
                let uniqueProducts = productsOnPage.filter(p => !allProducts.some(prod => prod.handle === p.handle));
                allProducts = allProducts.concat(uniqueProducts);
                fetchedPages++;
            });

            saveDataToStorage(allProducts);
            // console.log(`✅ ${allProducts.length} productos cargados y almacenados hasta ahora.`);
        }

        isFetching = false;
        // console.log("✅ Todos los productos B2B cargados y almacenados.");
        return allProducts;
    }

    async function checkForUpdates() {
        if (isFetching) {
            // console.log("⏳ Carga en proceso, evitando verificación duplicada.");
            return;
        }

        let storedProductCount = getStoredData().length;
        let liveProductCount = window.totalCollectionProducts || storedProductCount;

        // console.log(`📌 Productos en la colección actual: ${liveProductCount}`);
        // console.log(`📌 Productos almacenados: ${storedProductCount}`);

        if (liveProductCount !== storedProductCount) {
            // console.log("🔄 Cambios detectados en la colección. Recargando productos...");
            await fetchAllCollectionProducts();
        } else {
            // console.log("✅ No hay cambios en la cantidad de productos.");
        }
    }

    async function initializeProductData() {
        if (isFetching) {
            // console.log("⏳ Carga en proceso, evitando inicialización duplicada.");
            return;
        }

        let storedData = getStoredData();
        let storedCount = storedData.length;
        let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (storedData.length > 0 && storedCount === (window.totalCollectionProducts || storedCount) && !isSafari) {
            // console.log("🛑 Usando datos almacenados en LocalStorage.");
            window.b2bPrices = storedData;
        } else {
            // console.log("🚀 Primera carga de productos en Safari o sin datos previos...");
            window.b2bPrices = await fetchAllCollectionProducts();
        }

        setInterval(checkForUpdates, 5 * 60 * 1000);
    }

    initializeProductData();

    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            // console.log("🔄 Verificando cambios en la colección tras cambio de página...");
            checkForUpdates();
        }
    });
});
