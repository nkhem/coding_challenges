import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", retrieve);
oReq.open("GET", "/records?limit=2&offset=0&color[]=brown&color[]=green");
var params = "page=2";
// var params = "lorem=ipsum&name=binny";
oReq.send(params);

function retrieve(options) {
  if (oReq.readyState === oReq.DONE) {
    if (oReq.status === 200) {
        console.log(oReq.response);
        console.log(oReq.responseText);
    }
  }
}



export default retrieve;
