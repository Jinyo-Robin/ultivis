var containerNavbar = {
  HTML : '\
    <div class="navBar">\
      <div class="tcell"></div>\
      <div class="tcell w60">\
      <button class="toggleControlPanel">open</button>\
      </div>\
    </div>\
  '
}

var containerControlpanel = {
  HTML : '\
    <div class="navBar">\
      <div class="tcell"></div>\
      <div class="tcell w60">\
      <button class="toggleControlPanel">open</button>\
      </div>\
    </div>\
  '
}

var controlpanel = {
    teststring : "my teststring",
    containerNavbar : document.createElement('div'),
    containerControlpanel : document.createElement('div'),
    containerControlpanelText : "",
    containerControlpanelVisible : false,
    toggleContainerControlpanelVisible : function () {
    containerControlpanelVisible = !containerControlpanelVisible;
    if (containerControlpanelVisible) {
        containerControlpanel.style.display = "block";
    } else {
        containerControlpanel.style.display = "none";
    }
  },
  run : function () {
    console.log("running controlpanel");
    var parent;
    // nav bar container
    this.containerNavbar.setAttribute('class','containerNavbar');
    parent = document.body || document.querySelector('body');
    parent.insertBefore(this.containerNavbar, parent.firstChild);
    // control panel
    this.containerControlpanel.setAttribute('id','containerControlpanel');
    parent = document.body || document.querySelector('body');
    parent.insertBefore(this.containerControlpanel, parent.firstChild);
    // inline console
    this.refresh();
    this.addFunctions();
  },
  refresh : function () {
    this.containerNavbar.innerHTML = containerNavbar.HTML;
    this.containerControlpanel.innerHTML = containerControlpanel.HTML;
  },
  addFunctions : function () {
    // toggleContainerControlpanelVisible
    let functionElements = document.querySelectorAll('.toggleContainerControlpanelVisible');
    for (let i = 0; i < functionElements.length; i++) {
      functionElements[i].addEventListener ("click", () => {gui.toggleContainerControlpanelVisible();}, false);
    }
  }
}
