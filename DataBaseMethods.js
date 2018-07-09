// IndexedDB에 connect하고 만들어놓은 database에 들어가서 값 데베 id 값 읽기, 추가하기, 삭제 함수가 들어있는 자바스크립

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
var str;
var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
  console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: " + db);
};

//scores라는 데베를 만들어놓았고 거기에 접속
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("scores", {
    keyPath: "id"
  });
}

//원하는 id 값의 data를 읽기 함수
function read(key) {
  var transaction = db.transaction(["scores"]);
  var objectStore = transaction.objectStore("scores");
  var request = objectStore.get(key);
  request.onerror = function(event) {
    alert("Unable to retrieve daa from database!");
  };

  request.onsuccess = function(event) {
    // Do something with the request.result!
    if (request.result) {
      var num = request.result.score;
      localStorage.setItem("starScore", num.toFixed(1));
      //alert("SCORE : " + request.result.score);
      document.getElementById("displayScore").innerHTML = num.toFixed(1);
      //alert(num.toFixed(1));
    } else {
      //alert("Kenny couldn't be found in your database!");
    }
  };
}

//id 값에 score 값 추가하는 함수
function add(key, num) {
  var request = db.transaction(["scores"], "readwrite")
    .objectStore("scores")
    .add({
      id: key,
      score: num
    });

  request.onsuccess = function(event) {
    //alert("it has been added to your database.");
  };

  request.onerror = function(event) {
    alert("Unable to add data\r\nit is aready exist in your database! ");
  };

}

//id 값으로 해당 데이터 찾아서 삭제하는 함수
function remove(key) {

  var request = db.transaction(["scores"], "readwrite")
    .objectStore("scores")
    .delete(key);
  request.onsuccess = function(event) {
    //alert("entry has been removed from your database.");
  };
}
