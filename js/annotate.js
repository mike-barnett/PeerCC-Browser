(function (g) {
    "use strict";

    let isAnnotating = false;


    window.onload = function () {
        initialize();
    };

    function initialize() {
        try {
            document
                .getElementById("annotate_btn")
                .addEventListener("click", onAnnotateButtonPressed);
        } catch (e) {
            showMessage("Initilization error: " + e.message || e, true);
        }
    }

    function onAnnotateButtonPressed() {
        if (isAnnotating) {
            stopAnnotating();
        } else {
            startAnnotating();
        }
    }

    function stopAnnotating() {
        let e = document.getElementById("annotate_btn");
        let v = e.value;
        e.value = "Start Annotate";
        isAnnotating = false;
    }

    function startAnnotating() {
        let e = document.getElementById("annotate_btn");
        let v = e.value;
        e.value = "Stop Annotate";
        isAnnotating = true;
    }


})(typeof window === "object" ? window : global);
