function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
  
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
  
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  }

function accordions() {
    var acc = document.getElementsByClassName("dropdown-button");

        var i;

        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
     
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "flex") {
            panel.style.display = "none";
            } else {
            panel.style.display = "flex";
            }
        });
        }
  }
  waitForElm('.dropdown-content').then((elm) => {
      accordions()
  });
