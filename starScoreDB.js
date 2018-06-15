//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const allData = [{
    id: "212", //광나루자전거공원 - 강동구
    score: 3.2
  },
  {
    id: "215", //강동구-허브천문공원
    score: 3.5
  },
  {
    id: "412", //강서구-궁산근린공원
    score: 3.0
  },
  {
    id: "613", //광진구-어린이대공원
    score: 4.5
  },
  {
    id: "712", //구로-궁동생태공원
    score: 3.6
  },
  {
    id: "1212", //동작-보라매공원
    score: 3.8
  },
  {
    id: "1314", //마포-하늘공원
    score: 4.2
  },
  {
    id: "1912", //양천-서서울호수공원
    score: 3.7
  },
  {
    id: "2114", //용산구-이촌 한강공원
    score: 4.0
  },
  {
    id: "2215", //용산-효창공원
    score: 3.4
  },
  {
    id: "1321", //마포구 - 거기서 거기더라
    score: 4.1
  },
  {
    id: "2321", //종로구 - 미분당
    score: 4.2
  }
];



var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
  console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: " + db);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("scores", {
    keyPath: "id"
  });
  for (var i in allData) {
    objectStore.add(allData[i]);
  }
}
