document.addEventListener("DOMContentLoaded", function () {
    const collectionURL = "https://ds18.com/collections/shop-all"; // URL de la colección general

    async function fetchAllCollectionProducts(startPage = 1) {
        let allProducts = JSON.parse(localStorage.getItem("b2bPrices") || "[]");
        let storedProductCount = parseInt(localStorage.getItem("b2bProductsTotal") || "0", 10);
        let page = startPage;

        console.log("🔄 Continuando desde la página:", page);

        async function fetchPage(page) {
            try {
                let response = await fetch(`${collectionURL}?page=${page}`);
                let text = await response.text();
                let parser = new DOMParser();
                let doc = parser.parseFromString(text, "text/html");

                let productElements = doc.querySelectorAll("product-item.product-item-b2b .product-item-b2b__container-prices");

                if (productElements.length === 0) {
                    return []; // No hay más productos
                }

                return Array.from(productElements).map(el => ({
                    handle: el.getAttribute("data-handle"),
                    your_price: el.getAttribute("data-your-price"),
                    dealer_price: el.getAttribute("data-dealer")
                }));
            } catch (error) {
                console.error(`❌ Error al obtener la página ${page}:`, error);
                return [];
            }
        }

        console.log("⏳ Iniciando carga de productos B2B...");

        while (allProducts.length < storedProductCount) {
            console.log(`📄 Cargando página ${page}...`);
            let productsOnPage = await fetchPage(page);

            if (productsOnPage.length === 0) {
                console.log(`✅ No hay más productos en la página ${page}, finalizando...`);
                break;
            }

            allProducts = allProducts.concat(productsOnPage);
            page++;
        }

        localStorage.setItem("b2bPrices", JSON.stringify(allProducts));
        localStorage.setItem("b2bProductsTotal", allProducts.length);

        console.log("✅ Todos los productos B2B cargados y almacenados:", allProducts);
        return allProducts;
    }

    async function checkForUpdates() {
        let storedProductCount = parseInt(localStorage.getItem("b2bProductsTotal") || "0", 10);
        let liveProductCount = window.totalCollectionProducts || storedProductCount;

        console.log(`📌 Productos en la colección actual: ${liveProductCount}`);
        console.log(`📌 Productos almacenados: ${storedProductCount}`);

        if (liveProductCount !== storedProductCount) {
            console.log("🔄 Cambios detectados en la colección. Recargando productos...");
            return await fetchAllCollectionProducts();
        } else if (liveProductCount > storedProductCount) {
            console.log("🟡 Faltan productos por cargar, continuando...");
            return await fetchAllCollectionProducts(storedProductCount / 50 + 1);
        } else {
            console.log("✅ No hay cambios en la cantidad de productos.");
            return JSON.parse(localStorage.getItem("b2bPrices"));
        }
    }

    async function initializeProductData() {
        let storedData = JSON.parse(localStorage.getItem("b2bPrices"));
        let storedCount = parseInt(localStorage.getItem("b2bProductsTotal") || "0", 10);

        if (storedData && storedData.length === storedCount) {
            console.log("🛑 Usando datos almacenados en LocalStorage.");
            window.b2bPrices = storedData;
        } else {
            window.b2bPrices = await fetchAllCollectionProducts();
        }

        setInterval(checkForUpdates, 5 * 60 * 1000);
    }

    initializeProductData();
});
