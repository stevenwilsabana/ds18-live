// /*********************** Custom JS for Boost AI Search & Discovery  ************************/

let windowWidth = 0; // Initialize the windowWidth variable to store the width.
const isMobile = () => {
  if (!windowWidth) {
    // We don't want to re-calculate the width every time because it causes a style recalculation every time.
    // So we store it
    windowWidth = window.innerWidth;

    // Calculate the width on resize
    window.addEventListener('resize', () => {
      windowWidth = window.innerWidth;
    });
  }
  return windowWidth <= 768;
};




// window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([(componentRegistry) => {
//   const AppendISW = {
//     name: 'Custom ISW',
//     apply() {
//       return {
//         afterRender(element) {
//           let widgetSelector = element.getRootElm();
//           const drawerSelector = document.querySelector('predictive-search-drawer');

//           const widgetHtml = widgetSelector.innerHTML !== '' ? widgetSelector : '';
//           console.log(widgetSelector.innerHTML != '')
//           if (widgetHtml !== '') {
//             if (drawerSelector) {
//               const drawerContent = drawerSelector.querySelector('.drawer__content');
//               if (drawerContent) {
//                 drawerContent.innerHTML = '';
//                 if (drawerSelector.querySelector('boost-sd__instant-search-results') == null) drawerContent.appendChild(widgetHtml);
//               }
//             }
//           }
          
//           const closeButton = document.querySelector("predictive-search-drawer .drawer__close-button");
//           // if (closeButton) {
//           //   closeButton.removeEventListener('click', true);
//           //   closeButton.addEventListener('click', () => {
//           //       console.log('1');
//           //       drawerSelector.removeAttribute('open');
//           //     console.log(drawerSelector)
//           //   });
//           // }
//         },
//       };
//     },
//   };
//   componentRegistry.useComponentPlugin('SearchContentResult', AppendISW);
// }]);


window.addEventListener('load', ()=> {
  if (!isMobile()) return; // Boost 196904
  const searchIcon = document.querySelector('a.header__icon-wrapper.tap-area.hidden-lap.hidden-desk');
  const searchInput = document.querySelector('.boost-sd__search-form-input, .predictive-search__input');
  const html = document.querySelector('html');
  
  

  searchIcon.addEventListener('click', ()=> {
		searchInput?.click();
	});
  
  searchInput.addEventListener('click', ()=> {
    	html.classList.add('lock-all');
	});
  
  // on click outside
  document.addEventListener('click', function(event) {
    
  // Check if the click event target is outside of the specific element(s)
    const input = document.querySelector('.boost-sd__search-widget-init-input');
    if(!input) return;

    input.blur();
    html.classList.remove('lock-all');
    
  // if (!event.target.contains(input)) {
  //   console.log('click outside');
  //   const htmlNode = document.querySelector('html');
  // htmlNode.classList.remove('lock-all');
  // }
});



});

window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([
    (componentRegistry) => {
        componentRegistry.useComponentPlugin('ProductTitle', {
            name: 'Modify Product Label',
            enabled: true,
            apply: () => ({
                className: 'extra-class',
                props: (props) => {
                    props.label += ' Boost'; // Modify props
                    return props;
                },
                style: {
                    color: 'red', // Modify styles
                },
                render(elementModel, currentRenderElement) {
                    return currentRenderElement;
                },
                beforeRender(element) {},
                afterRender(element) {},
                // Commonly used for customization
            }),
        });
    }
]);