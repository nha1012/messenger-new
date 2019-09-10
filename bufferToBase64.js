var btoa = require('btoa');
export let bufferToBase64=(bufferFrom)=>{

  "use strict";
  
  var b64 = btoa(bufferFrom);
  return b64
}
