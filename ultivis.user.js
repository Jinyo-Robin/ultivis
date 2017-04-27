// ==UserScript==
// @name        ultivis
// @namespace   TimidScript
// @description ultivis
// @include     http://univis.uni-erlangen.de/*
// @require     jquery.min.js
// @require     ultivis.user.css.js
// @require     config.js
// @require     test.js
// @require     controlpanel.js
// @version     1
// @grant       none
// ==/UserScript==

// --- utils start
function addToLocalStorageArray(key, input) {
  var storageArray = [];
  if (!!window.localStorage[key]) {
    storageArray = JSON.parse(window.localStorage[key]);
  }
  storageArray = storageArray.concat(input);
  window.localStorage[key] = JSON.stringify(storageArray);
}

function parseAllPersons(aElementArray) {
  var persons = [];
  for (var i = 0, len = aElementArray.length; i < len; i++) {
    persons.push({
      'name' : aElementArray[i].innerText,
      'href' : aElementArray[i].href
    });
  }
  return persons;
}

// --- utils end


/*

// --- GUI start


var containerInlineconsole = {
  HTML : '\
    <div class="navBar">\
      <div class="tcell"></div>\
      <div class="tcell w60">\
        <button class="toggleContainerControlpanelVisible">close</button>\
      </div>\
    </div>\
    <div class="table">\
      <div class="trow">\
        <div class="tcell border">' + controlPanelText + '</div>\
      </div>\
    </div>\
  '
}

var gui = {
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
  containerInlineconsole : document.createElement('div'),
  containerInlineconsoleText : "",
  construct : function () {
    let parent;
    // nav bar container
    this.containerNavbar.setAttribute('class','containerNavbar');
    parent = document.body || document.querySelector('body');
    parent.insertBefore(this.containerNavbar, parent.firstChild);
    // control panel
    this.containerControlpanel.setAttribute('id','containerControlpanel');
    parent = document.body || document.querySelector('body');
    parent.insertBefore(this.containerControlpanel, parent.firstChild);
    // inline console
    this.containerInlineconsole.setAttribute('id','containerInlineconsole');
    parent = document.querySelectorAll('table')[0].children[0].children[3].children[0];
    parent.insertBefore(this.containerInlineconsole, null);
    this.refresh();
    this.addFunctions();
  },
  refresh : function () {
    this.containerNavbar.innerHTML = containerNavbar.HTML;
    this.containerControlpanel.innerHTML = containerControlpanel.HTML;
    this.containerInlineconsole.innerHTML = containerInlineconsole.HTML;
  },
  addFunctions : function () {
    // toggleContainerControlpanelVisible
    let functionElements = document.querySelectorAll('.toggleContainerControlpanelVisible');
    for (let i = 0; i < functionElements.length; i++) {
      functionElements[i].addEventListener ("click", () => {gui.toggleContainerControlpanelVisible();}, false);
    }
  }
}
gui.construct();
// --- GUI end
*/

// --- MAIN start
(function checkSitetype () {
  console.log();
  console.log('starting site type checker');

  // lecture profile
  if (window.location.href.indexOf('lecture_view') > -1) {
    console.log('1/5: starting lecture profile: url = ' + window.location.href.indexOf('lecture_view'));
    // getting lecture long title
    var lectureLongTitle = document.querySelector('h3').innerText;
    if (lectureLongTitle.indexOf('(') > -1) {
      lectureLongTitle = lectureLongTitle.substring(0,lectureLongTitle.indexOf('('));
    }
    lectureLongTitle = lectureLongTitle.trim();
    // updating lecture object in storage
    if (lectureLongTitle.length > 0 && !window.localStorage.lectures || JSON.parse(window.localStorage.lectures).indexOf(lectureLongTitle) == -1) {
      addToLocalStorageArray('lectures',lectureLongTitle);
    }
    console.log(JSON.parse(window.localStorage.lectures));
  } else {
    console.log("1/5: this site is not a lecture profile");
  }

  // lecture overview
  if (window.location.href.indexOf('tum_show') > -1 || document.querySelector('h2') && document.querySelector('h2').innerText.indexOf('Lehrveranstaltungsverzeichnis') > -1) {
    console.log('2/5: starting lecture overview: url = ' + window.location.href.indexOf('tum_show'));
    var heads = document.querySelectorAll('h4');
    // collect all lectures information
    var lectureObjects = [];
    for (var i = 0, len = heads.length; i < len; i++) {
      if (!heads[i].parentElement.querySelector('small')) {
        alert('no shortDescription on lesson ' + i);
      }
      lectureObjects.push({
        'name' : heads[i].innerText,
        'href' : heads[i].querySelector('a').href,
        'shortDescription' : heads[i].parentElement.querySelector('small') ? heads[i].parentElement.querySelector('small').innerText : '',
        'persons' : parseAllPersons(heads[i].parentElement.parentElement.querySelectorAll('td')[3].querySelectorAll('a'))
      });
    }
    console.log('lectureObjects:');
    console.log(lectureObjects);
    for (let i = 0; i < lectureObjects.length; i++) {
      for (let key in lectureObjects[i]) {
        if (lectureObjects[i].hasOwnProperty(key)) {
          controlPanelText += key + '::' + lectureObjects[i][key] + '</br>';
        }
      }
      controlPanelText += '</br>'
    }
    GUIrefresh();
    // list lectures without short name
    var lecturesWithoutShortName = [];
    for (var i = 0, len = heads.length; i < len; i++) {
      if (heads[i].innerText.indexOf('[') == -1) {
        lecturesWithoutShortName.push(heads[i].innerText);
      };
    };
    console.log('lecturesWithoutShortName:');
    console.log(lecturesWithoutShortName);
  } else {
    console.log("2/5: this site is not a lecture overview");
  }

  // lecture timesheet
  if (window.location.href.indexOf('lecture_plan') > -1) {
    console.log('3/5: starting lecture timesheet: url = ' + window.location.href.indexOf('lecture_plan')); 
  } else {
    console.log("3/5: this site is not a lecture timesheet");
  }

  // person profile
  if (window.location.href.indexOf('tel_view') > -1) { // index might always be 50
    console.log('4/5: starting person profile: url = ' + window.location.href.indexOf('tel_view'));
  } else {
    console.log("4/5: this site is not a person profile");
  }

  // room profile
  if (window.location.href.indexOf('room_view') > -1) {
    console.log('5/5: starting room profile: url = ' + window.location.href.indexOf('room_view'));
    // XPath ,getting the first td which has only a textNode that contains 'Raumnummer'
    var roomNameLabel = document.evaluate("//td[contains(text(), 'Raumnummer')]", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    var roomName = roomNameLabel.nextSibling.innerHTML; // next sibling is the roomname itself
    // updating room object in storage
    if (roomName.length > 0 && !window.localStorage.rooms || JSON.parse(window.localStorage.rooms).indexOf(roomName) == -1) {
      addToLocalStorageArray('rooms',roomName);
    }
    console.log(JSON.parse(window.localStorage.rooms));
  } else {
    console.log("5/5: this site is not a room profile");
  }
})();
  
(function checkCookies () {
  console.log();
  console.log('starting cookie checker');
  console.log(document.cookie.split(';'));
})();

(function collectURLs () {
  console.log();
  console.log('starting url collector');
  addToLocalStorageArray('urlList', window.location.href);
  console.log(JSON.parse(window.localStorage.urlList));
})();
// --- MAIN end

controlpanel.run();

if (config.test) {
  test.run();
}
