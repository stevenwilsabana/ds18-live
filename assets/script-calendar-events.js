document.addEventListener("DOMContentLoaded", function() {
    var targetNode = document.querySelector('.elfsight-sapp-5a90b4bd-cda0-45d3-974a-413df35a69a9');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                console.log('Se detectaron cambios en el nodo.');
                $("#loader-calendar-events").fadeOut("slow", function() {

                    $("#events-calendar-general").css("display","flex");
                    $("#events-calendar-general").css("visibility","hidden");
                    if ($(window).width() > 448) {
                      $( "#events-calendar-general .eapp-events-calendar-list-item-component" ).each(function() {
                        $(this).removeClass('eapp-events-calendar-list-item-mobile');
                      });
                    };
                    $("#events-calendar-general").css("visibility","visible");

                });

                observer.disconnect();
            }
        });
    });

    var config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
});