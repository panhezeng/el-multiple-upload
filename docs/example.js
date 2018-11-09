!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){e.exports=Vue},function(e,t,n){window,e.exports=function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";n.r(t),n.d(t,"UCloudUFile",function(){return a});var r=n(0),o=n.n(r),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.bucketName=t,this.bucketUrl=n,this.tokenServerUrl=r,this.PREFIX=o,this.uploading=!1,this.contentMd5="",this.slice=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,this.sliceSize=4194304}return i(e,[{key:"createAjax",value:function(e){var t={};return t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),XMLHttpRequest.prototype.sendAsBinary||(XMLHttpRequest.prototype.sendAsBinary=function(e){var t=Array.prototype.map.call(e,function(e){return 255&e.charCodeAt(0)}),n=new Uint8Array(t);this.send(n.buffer)}),t}},{key:"getBucketUrl",value:function(){var e=this.bucketUrl;return"/"!==e.charAt(e.length-1)&&(e+="/"),e}},{key:"getFileName",value:function(e,t){return t&&""!==t?t:e.name}},{key:"addPrefix",value:function(e){return this.PREFIX?this.PREFIX+"/"+e:e}},{key:"check",value:function(e){if(("[object Object]"!==Object.prototype.toString.call(e)||"[object File]"!==Object.prototype.toString.call(e.file))&&"[object File]"!==Object.prototype.toString.call(e))throw new Error("file参数必须为File数据类型")}},{key:"getContentMd5",value:function(e,t){this.check(e);var n=this,r=new FileReader,i=new o.a.ArrayBuffer,a=Math.ceil(e.size/this.sliceSize),u=0;function s(){var t=u*n.sliceSize,o=t+n.sliceSize>=e.size?e.size:t+n.sliceSize;r.readAsArrayBuffer(n.slice.call(e,t,o))}r.onload=function(e){i.append(e.target.result),++u<a?s():(n.contentMd5=i.end(),t(n.contentMd5))},s()}},{key:"getUFileToken",value:function(e,t,n){var r=e.method||"GET",o=e.file||{},i=e.fileName,a=e.md5Required,u=void 0,s=e.contentType||o.type||"",l=e.putPolicy||"";u=i||(o.FileName?o.FileName:o.name?this.addPrefix(o.name):"");var c=this;function f(e,r,o,i,a,u,s,l){var f=c.createAjax(),p=e+"?method="+r+"&bucket="+o+"&key="+i+"&content_md5="+a+"&content_type="+u+"&date="+s+"&put_policy="+l;f.open("GET",p,!0),f.onreadystatechange=function(){4===f.readyState&&(200===f.status?t(f.responseText.trim()):n(f.responseText))},f.send()}"[object File]"===Object.prototype.toString.call(o)&&!1!==a?this.getContentMd5(o,function(e){f(c.tokenServerUrl,r,c.bucketName,encodeURIComponent(u),e,s,"",l)}):f(c.tokenServerUrl,r,c.bucketName,encodeURIComponent(u),"",s,"",l)}},{key:"getFileDetail",value:function(e,t,n){var r=this,o={method:"HEAD",fileName:e};this.getUFileToken(o,function(o){var i=r.createAjax(),a=r.getBucketUrl()+encodeURIComponent(e);i.open("HEAD",a,!0),i.setRequestHeader("Authorization",o),i.onreadystatechange=function(){if(4===i.readyState)if(200===i.status){var e=i.getResponseHeader("ETag"),r={contentType:i.getResponseHeader("Content-Type"),eTag:e.substring(1,e.length-1),status:i.status,response:i.response};t(r)}else n(i.responseText)},i.send()},n)}},{key:"sliceUpload",value:function(e,t,n,r){this.check(e);var o=this,i=e.file||{},a=e.fileRename,u=this.addPrefix(this.getFileName(i,a)),s=new FileReader,l=Math.ceil(i.size/this.sliceSize),c=0;this.initMultipartUpload(function(e){var a=e.Key,u=e.UploadId,f=0,p=0,d="";function h(){var e=c*o.sliceSize,h=e+o.sliceSize>=i.size?i.size:e+o.sliceSize,y=o.slice.call(i,e,h,i.type);y.name=i.name,o.multipartUploading(function(e){p++,d=""===d?e.eTag:d+","+e.eTag,r({status:"uploading",value:p/l}),p===l&&o.multipartUploaded(function(e){t(e)},n,r,a,u,i,d)},n,a,u,f,y),f++,s.readAsArrayBuffer(y)}s.onload=function(e){++c<l&&h()},h()},n,r,i,u)}},{key:"initMultipartUpload",value:function(e,t,n,r,o){var i=this,a=r.type||"",u={method:"POST",file:r,fileName:o,md5Required:!1};this.getUFileToken(u,function(r){var u=i.createAjax(),s=i.getBucketUrl()+encodeURIComponent(o)+"?uploads";u.open("POST",s,!0),u.setRequestHeader("Authorization",r),u.setRequestHeader("Content-Type",a),u.onreadystatechange=function(){4===u.readyState&&(200===u.status?e(JSON.parse(u.response)):t(u.responseText))},u.upload.onprogress=function(e){if(e.lengthComputable){var t={status:"init",value:e.loaded/e.total};n(t)}},u.send()},t)}},{key:"multipartUploading",value:function(e,t,n,r,o,i){var a=this,u={method:"PUT",file:i,fileName:n,md5Required:!1};this.getUFileToken(u,function(u){var s=a.createAjax(),l=a.getBucketUrl()+encodeURIComponent(n)+"?uploadId="+r+"&partNumber="+o;s.open("PUT",l,!0),s.setRequestHeader("Authorization",u),s.setRequestHeader("Content-Type",i.type),s.onreadystatechange=function(){if(4===s.readyState)if(200===s.status){var n=s.getResponseHeader("ETag"),r={eTag:n.substring(1,n.length-1),response:s.response};e(r)}else t(s.responseText)},s.send(i)},t)}},{key:"multipartUploaded",value:function(e,t,n,r,o,i,a){var u=this,s=i.type||"application/octet-stream",l={method:"POST",file:i,fileName:r,md5Required:!1,contentType:s};this.getUFileToken(l,function(i){var l=u.createAjax(),c=u.getBucketUrl()+encodeURIComponent(r)+"?uploadId="+o;l.open("POST",c,!0),l.setRequestHeader("Authorization",i),l.setRequestHeader("Content-Type",s),l.onreadystatechange=function(){4===l.readyState&&(200===l.status?e(l.responseText):t(l.responseText))},l.upload.onprogress=function(e){if(e.lengthComputable){var t={status:"uploaded",value:e.loaded/e.total};n(t)}},l.send(a)},t)}},{key:"hitUpload",value:function(e,t,n,r){this.check(e);var o=this,i=this.addPrefix(this.getFileName(e,r));this.getFileDetail(i,function(r){var a={method:"POST",file:e,fileName:i,md5Required:!1};o.getUFileToken(a,function(a){var u=o.createAjax(),s=o.getBucketUrl()+"uploadhit?Hash="+r.eTag+"&FileName="+encodeURIComponent(i)+"&FileSize="+e.size;u.open("POST",s,!0),u.setRequestHeader("Authorization",a),u.setRequestHeader("Content-Type",e.type),u.onreadystatechange=function(){4===u.readyState&&(200===u.status?t(u.responseText):n(u.responseText))},u.send(e)},n)},n)}},{key:"hitSliceUpload",value:function(e,t,n,r){var o=this,i=(e.name+"-lastModified"+e.lastModified+"-size"+e.size).substr(0,160)+e.name.replace(/.+(\..+)$/,"$1");r(),this.hitUpload(e,function(e){console.log("successHit",e),t({Key:o.addPrefix(i)})},function(a){console.log("errorHit",a);var u={file:e,fileRename:i};o.sliceUpload(u,function(e){try{console.log("successSlice",e),t(JSON.parse(e))}catch(e){n()}},function(){console.log("errorSlice"),n()},r)},i)}},{key:"uploadFile",value:function(e,t,n,r){this.check(e);var o=this,i=e.file||{},a=e.fileRename,u=this.addPrefix(this.getFileName(i,a)),s=e.putPolicy,l={method:"PUT",file:i,fileName:u,putPolicy:s};this.getUFileToken(l,function(e){var a=o.createAjax(),s=o.getBucketUrl()+encodeURIComponent(u);a.open("PUT",s,!0),a.setRequestHeader("Authorization",e),a.setRequestHeader("Content-MD5",o.contentMd5),a.setRequestHeader("Content-Type",i.type),a.onreadystatechange=function(){4===a.readyState&&(200===a.status?t({msg:a.responseText,file:i}):n({msg:a.responseText,file:i}))},a.upload.onprogress=function(e){e.lengthComputable&&r(e.loaded/e.total)},a.send(i)},n)}},{key:"batchUpload",value:function(e,t,n,r){var o=this,i=[],a=[],u=0;if(0!=e.length){var s=function(r){a.push(r.file),i.length+a.length==e.length&&(i.length&&t(i),n({errorList:a,successList:i}))},l=function(e){};r(0),o.hitSliceUpload(e[u],function n(a){i.push(a.file),r(i.length/e.length),i.length==e.length?t(i):(u++,o.hitSliceUpload(e[u],n,s,l))},s,l)}else console.warn("批量上传列表为空")}},{key:"formUpload",value:function(e,t,n){this.check(e);var r=this,o=e.file||{},i=e.fileRename,a=this.addPrefix(this.getFileName(o,i)),u=e.putPolicy,s={method:"POST",file:o,fileName:a,putPolicy:u};this.getUFileToken(s,function(e){var i=r.createAjax(),u=r.getBucketUrl(),s=new FileReader;s.addEventListener("load",function(){for(var l=new Uint8Array(s.result),c="",f=0;f<l.length;f++)c+=String.fromCharCode(l[f]);o.binary=c;var p=new Blob([a]),d=new FileReader;d.addEventListener("load",function(){for(var a=new Uint8Array(d.result),s="",l=0;l<a.length;l++)s+=String.fromCharCode(a[l]);var c="----UCloudPOSTFormBoundary",f="--"+c+'\r\nContent-Disposition: form-data; name="FileName"\r\n\r\n'+s+"\r\n--"+c+'\r\nContent-Disposition: form-data; name="Authorization"\r\n\r\n'+e+"\r\n--"+c+'\r\nContent-Disposition: form-data; name="file"; filename="'+s+'"\r\nContent-Type: '+o.type+"\r\n\r\n"+o.binary+"\r\n--"+c+"--\r\n";i.open("POST",u,!0),i.setRequestHeader("Content-MD5",r.contentMd5),i.setRequestHeader("Content-Type","multipart/form-data; boundary="+c),i.onreadystatechange=function(){4==i.readyState&&(200==i.status?t(i.response):n(i.response))},i.sendAsBinary(f)}),p&&d.readAsArrayBuffer(p)}),o&&s.readAsArrayBuffer(o)},n)}},{key:"getFileList",value:function(e,t,n){this.check(e);var r=this,o=e.prefix||r.PREFIX,i=e.marker||"",a=e.limit||20;this.getUFileToken({method:"GET"},function(e){var u=r.createAjax(),s=r.getBucketUrl()+"?list&prefix="+o+"&marker="+i+"&limit="+a;u.open("GET",s,!0),u.setRequestHeader("Authorization",e),u.onreadystatechange=function(){4==u.readyState&&(200==u.status?t(JSON.parse(u.response)):n(u.responseText))},u.send()},n)}},{key:"deleteFile",value:function(e,t,n){var r=this,o={method:"DELETE",fileName:e};this.getUFileToken(o,function(o){var i=r.createAjax(),a=r.getBucketUrl()+encodeURIComponent(e);i.open("DELETE",a,!0),i.setRequestHeader("Authorization",o),i.onreadystatechange=function(){4==i.readyState&&(204==i.status?t({msg:i.responseText,file:e}):n({msg:i.responseText,file:e}))},i.send()},n)}},{key:"batchDelete",value:function(e,t,n){var r=[],o=[];if(0!=e.length)for(var i=0;i<e.length;i++)this.deleteFile(e[i],function(n){r.push(n.file),r.length==e.length&&t(r)},function(t){o.push(t.file),r.length+o.length==e&&n({successList:r,errorList:o})});else console.warn("删除列表为空")}},{key:"downloadFile",value:function(e,t,n,r){var o=this,i={method:"GET",fileName:e};this.getUFileToken(i,function(i){var a=o.createAjax(),u=o.getBucketUrl()+encodeURIComponent(e);a.open("GET",u,!0),a.responseType="blob",a.setRequestHeader("Authorization",i),a.onreadystatechange=function(){if(4==a.readyState)if(200==a.status){var r=document.createElement("a"),o=a.response;r.download=e,r.href=URL.createObjectURL(o),r.click(),URL.revokeObjectURL(o),t(a.response)}else n(a.response)},a.onprogress=function(e){e.lengthComputable&&r(e.loaded/e.total)},a.send()},n)}}]),e}()}]).UCloudUFile}(n(2))},function(e,t,n){e.exports=function(e){"use strict";var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function n(e,t){var n=e[0],r=e[1],o=e[2],i=e[3];n+=(r&o|~r&i)+t[0]-680876936|0,i+=((n=(n<<7|n>>>25)+r|0)&r|~n&o)+t[1]-389564586|0,o+=((i=(i<<12|i>>>20)+n|0)&n|~i&r)+t[2]+606105819|0,r+=((o=(o<<17|o>>>15)+i|0)&i|~o&n)+t[3]-1044525330|0,n+=((r=(r<<22|r>>>10)+o|0)&o|~r&i)+t[4]-176418897|0,i+=((n=(n<<7|n>>>25)+r|0)&r|~n&o)+t[5]+1200080426|0,o+=((i=(i<<12|i>>>20)+n|0)&n|~i&r)+t[6]-1473231341|0,r+=((o=(o<<17|o>>>15)+i|0)&i|~o&n)+t[7]-45705983|0,n+=((r=(r<<22|r>>>10)+o|0)&o|~r&i)+t[8]+1770035416|0,i+=((n=(n<<7|n>>>25)+r|0)&r|~n&o)+t[9]-1958414417|0,o+=((i=(i<<12|i>>>20)+n|0)&n|~i&r)+t[10]-42063|0,r+=((o=(o<<17|o>>>15)+i|0)&i|~o&n)+t[11]-1990404162|0,n+=((r=(r<<22|r>>>10)+o|0)&o|~r&i)+t[12]+1804603682|0,i+=((n=(n<<7|n>>>25)+r|0)&r|~n&o)+t[13]-40341101|0,o+=((i=(i<<12|i>>>20)+n|0)&n|~i&r)+t[14]-1502002290|0,r+=((o=(o<<17|o>>>15)+i|0)&i|~o&n)+t[15]+1236535329|0,n+=((r=(r<<22|r>>>10)+o|0)&i|o&~i)+t[1]-165796510|0,i+=((n=(n<<5|n>>>27)+r|0)&o|r&~o)+t[6]-1069501632|0,o+=((i=(i<<9|i>>>23)+n|0)&r|n&~r)+t[11]+643717713|0,r+=((o=(o<<14|o>>>18)+i|0)&n|i&~n)+t[0]-373897302|0,n+=((r=(r<<20|r>>>12)+o|0)&i|o&~i)+t[5]-701558691|0,i+=((n=(n<<5|n>>>27)+r|0)&o|r&~o)+t[10]+38016083|0,o+=((i=(i<<9|i>>>23)+n|0)&r|n&~r)+t[15]-660478335|0,r+=((o=(o<<14|o>>>18)+i|0)&n|i&~n)+t[4]-405537848|0,n+=((r=(r<<20|r>>>12)+o|0)&i|o&~i)+t[9]+568446438|0,i+=((n=(n<<5|n>>>27)+r|0)&o|r&~o)+t[14]-1019803690|0,o+=((i=(i<<9|i>>>23)+n|0)&r|n&~r)+t[3]-187363961|0,r+=((o=(o<<14|o>>>18)+i|0)&n|i&~n)+t[8]+1163531501|0,n+=((r=(r<<20|r>>>12)+o|0)&i|o&~i)+t[13]-1444681467|0,i+=((n=(n<<5|n>>>27)+r|0)&o|r&~o)+t[2]-51403784|0,o+=((i=(i<<9|i>>>23)+n|0)&r|n&~r)+t[7]+1735328473|0,r+=((o=(o<<14|o>>>18)+i|0)&n|i&~n)+t[12]-1926607734|0,n+=((r=(r<<20|r>>>12)+o|0)^o^i)+t[5]-378558|0,i+=((n=(n<<4|n>>>28)+r|0)^r^o)+t[8]-2022574463|0,o+=((i=(i<<11|i>>>21)+n|0)^n^r)+t[11]+1839030562|0,r+=((o=(o<<16|o>>>16)+i|0)^i^n)+t[14]-35309556|0,n+=((r=(r<<23|r>>>9)+o|0)^o^i)+t[1]-1530992060|0,i+=((n=(n<<4|n>>>28)+r|0)^r^o)+t[4]+1272893353|0,o+=((i=(i<<11|i>>>21)+n|0)^n^r)+t[7]-155497632|0,r+=((o=(o<<16|o>>>16)+i|0)^i^n)+t[10]-1094730640|0,n+=((r=(r<<23|r>>>9)+o|0)^o^i)+t[13]+681279174|0,i+=((n=(n<<4|n>>>28)+r|0)^r^o)+t[0]-358537222|0,o+=((i=(i<<11|i>>>21)+n|0)^n^r)+t[3]-722521979|0,r+=((o=(o<<16|o>>>16)+i|0)^i^n)+t[6]+76029189|0,n+=((r=(r<<23|r>>>9)+o|0)^o^i)+t[9]-640364487|0,i+=((n=(n<<4|n>>>28)+r|0)^r^o)+t[12]-421815835|0,o+=((i=(i<<11|i>>>21)+n|0)^n^r)+t[15]+530742520|0,r+=((o=(o<<16|o>>>16)+i|0)^i^n)+t[2]-995338651|0,n+=(o^((r=(r<<23|r>>>9)+o|0)|~i))+t[0]-198630844|0,i+=(r^((n=(n<<6|n>>>26)+r|0)|~o))+t[7]+1126891415|0,o+=(n^((i=(i<<10|i>>>22)+n|0)|~r))+t[14]-1416354905|0,r+=(i^((o=(o<<15|o>>>17)+i|0)|~n))+t[5]-57434055|0,n+=(o^((r=(r<<21|r>>>11)+o|0)|~i))+t[12]+1700485571|0,i+=(r^((n=(n<<6|n>>>26)+r|0)|~o))+t[3]-1894986606|0,o+=(n^((i=(i<<10|i>>>22)+n|0)|~r))+t[10]-1051523|0,r+=(i^((o=(o<<15|o>>>17)+i|0)|~n))+t[1]-2054922799|0,n+=(o^((r=(r<<21|r>>>11)+o|0)|~i))+t[8]+1873313359|0,i+=(r^((n=(n<<6|n>>>26)+r|0)|~o))+t[15]-30611744|0,o+=(n^((i=(i<<10|i>>>22)+n|0)|~r))+t[6]-1560198380|0,r+=(i^((o=(o<<15|o>>>17)+i|0)|~n))+t[13]+1309151649|0,n+=(o^((r=(r<<21|r>>>11)+o|0)|~i))+t[4]-145523070|0,i+=(r^((n=(n<<6|n>>>26)+r|0)|~o))+t[11]-1120210379|0,o+=(n^((i=(i<<10|i>>>22)+n|0)|~r))+t[2]+718787259|0,r=((r+=(i^((o=(o<<15|o>>>17)+i|0)|~n))+t[9]-343485551|0)<<21|r>>>11)+o|0,e[0]=n+e[0]|0,e[1]=r+e[1]|0,e[2]=o+e[2]|0,e[3]=i+e[3]|0}function r(e){var t,n=[];for(t=0;t<64;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return n}function o(e){var t,n=[];for(t=0;t<64;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return n}function i(e){var t,o,i,a,u,s,l=e.length,c=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=l;t+=64)n(c,r(e.substring(t-64,t)));for(e=e.substring(t-64),o=e.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<o;t+=1)i[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(i[t>>2]|=128<<(t%4<<3),t>55)for(n(c,i),t=0;t<16;t+=1)i[t]=0;return a=(a=8*l).toString(16).match(/(.*?)(.{0,8})$/),u=parseInt(a[2],16),s=parseInt(a[1],16)||0,i[14]=u,i[15]=s,n(c,i),c}function a(e){var n,r="";for(n=0;n<4;n+=1)r+=t[e>>8*n+4&15]+t[e>>8*n&15];return r}function u(e){var t;for(t=0;t<e.length;t+=1)e[t]=a(e[t]);return e.join("")}function s(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),e}function l(e){var t,n=[],r=e.length;for(t=0;t<r-1;t+=2)n.push(parseInt(e.substr(t,2),16));return String.fromCharCode.apply(String,n)}function c(){this.reset()}return u(i("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function t(e,t){return(e=0|e||0)<0?Math.max(e+t,0):Math.min(e,t)}ArrayBuffer.prototype.slice=function(n,r){var o,i,a,u,s=this.byteLength,l=t(n,s),c=s;return r!==e&&(c=t(r,s)),l>c?new ArrayBuffer(0):(o=c-l,i=new ArrayBuffer(o),a=new Uint8Array(i),u=new Uint8Array(this,l,o),a.set(u),i)}}(),c.prototype.append=function(e){return this.appendBinary(s(e)),this},c.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,o=this._buff.length;for(t=64;t<=o;t+=64)n(this._hash,r(this._buff.substring(t-64,t)));return this._buff=this._buff.substring(t-64),this},c.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<o;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(i,o),n=u(this._hash),e&&(n=l(n)),this.reset(),n},c.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},c.prototype.setState=function(e){return this._buff=e.buff,this._length=e.length,this._hash=e.hash,this},c.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},c.prototype._finish=function(e,t){var r,o,i,a=t;if(e[a>>2]|=128<<(a%4<<3),a>55)for(n(this._hash,e),a=0;a<16;a+=1)e[a]=0;r=(r=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(r[2],16),i=parseInt(r[1],16)||0,e[14]=o,e[15]=i,n(this._hash,e)},c.hash=function(e,t){return c.hashBinary(s(e),t)},c.hashBinary=function(e,t){var n=u(i(e));return t?l(n):n},c.ArrayBuffer=function(){this.reset()},c.ArrayBuffer.prototype.append=function(e){var t,r=function(e,t,n){var r=new Uint8Array(e.byteLength+t.byteLength);return r.set(new Uint8Array(e)),r.set(new Uint8Array(t),e.byteLength),n?r:r.buffer}(this._buff.buffer,e,!0),i=r.length;for(this._length+=e.byteLength,t=64;t<=i;t+=64)n(this._hash,o(r.subarray(t-64,t)));return this._buff=t-64<i?new Uint8Array(r.buffer.slice(t-64)):new Uint8Array(0),this},c.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<o;t+=1)i[t>>2]|=r[t]<<(t%4<<3);return this._finish(i,o),n=u(this._hash),e&&(n=l(n)),this.reset(),n},c.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.ArrayBuffer.prototype.getState=function(){var e=c.prototype.getState.call(this);return e.buff=function(e){return String.fromCharCode.apply(null,new Uint8Array(e))}(e.buff),e},c.ArrayBuffer.prototype.setState=function(e){return e.buff=function(e,t){var n,r=e.length,o=new ArrayBuffer(r),i=new Uint8Array(o);for(n=0;n<r;n+=1)i[n]=e.charCodeAt(n);return t?i:o}(e.buff,!0),c.prototype.setState.call(this,e)},c.ArrayBuffer.prototype.destroy=c.prototype.destroy,c.ArrayBuffer.prototype._finish=c.prototype._finish,c.ArrayBuffer.hash=function(e,t){var r=u(function(e){var t,r,i,a,u,s,l=e.length,c=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=l;t+=64)n(c,o(e.subarray(t-64,t)));for(e=t-64<l?e.subarray(t-64):new Uint8Array(0),r=e.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<r;t+=1)i[t>>2]|=e[t]<<(t%4<<3);if(i[t>>2]|=128<<(t%4<<3),t>55)for(n(c,i),t=0;t<16;t+=1)i[t]=0;return a=(a=8*l).toString(16).match(/(.*?)(.{0,8})$/),u=parseInt(a[2],16),s=parseInt(a[1],16)||0,i[14]=u,i[15]=s,n(c,i),c}(new Uint8Array(e)));return t?l(r):r},c}()},function(e,t,n){window,e.exports=function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict";n.r(t),n.d(t,"ElMultipleUpload",function(){return o});var r,o=n(4).default;function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"undefined"!=typeof window&&window.ElMultipleUploadOptions;r?console.warn("[ElMultipleUpload] already installed. Vue.use(ElMultipleUpload) should be called only once."):(r=e,"[object Object]"===Object.prototype.toString.call(t)&&"[object Function]"===Object.prototype.toString.call(t.upload)&&Object.assign(o.props.upload,{required:!1,default:t.upload}),r.component(o.name,o))}o.install=i,"undefined"!=typeof window&&window.Vue&&i(window.Vue)},function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-upload",e._b({ref:"upload",staticClass:"el-multiple-upload",attrs:{action:"","before-upload":e.beforeUpload,"http-request":e.requestUpload,"on-success":e.successUpload,"on-remove":e.removeUpload,"on-preview":e.onPreview||e.previewUpload,accept:e.accept,drag:e.drag,multiple:"","file-list":e.fileList}},"el-upload",e.$attrs,!1),[e.defaultElement?n("div",[n("i",{staticClass:"el-icon-upload"}),e._v(" "),n("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),n("em",[e._v("点击上传")])])]):e._e(),e._v(" "),e._t("default")],2)};r._withStripped=!0;var o=n(0),i=n(1),a=n.n(i),u=n(2),s=n.n(u),l=function(e,t,n,r,o,i,a,u){var s,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=[],l._compiled=!0),s)if(l.functional){l._injectStyles=s;var c=l.render;l.render=function(e,t){return s.call(t),c(e,t)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,s):[s]}return{exports:e,options:l}}({name:"ElMultipleUpload",components:{"el-upload":o.Upload},props:{upload:{required:!0,type:Function},resPathOfUrl:{type:String,default:"data.url"},fileList:{type:Array,default:function(){return[]}},checkUpload:Function,size:{type:Number},type:{validator:function(e){return""===e||/^(image|audio|video|text|application|\.)/.test(e)},default:""},drag:{type:Boolean,default:!0},defaultElement:{type:Boolean,default:!0},onPreview:Function},data:function(){return{elFileList:[]}},computed:{accept:function(){return/^(image|audio|video|text)$/.test(this.type)?"".concat(this.type,"/*"):this.type}},methods:{beforeUpload:function(e){var t=a()(e,this.type,this.size);return this.checkUpload?this.checkUpload(e,t):(t.message&&o.Message.error(t.message),t.validate)},requestUpload:function(e){return this.upload(e)},successUpload:function(e,t,n){var r=this;this.elFileList=n,n.every(function(e){return!("ready"===e.status||"uploading"===e.status)})&&this.$emit("update:fileList",n.reduce(function(e,t){return"success"===t.status&&(t.response?e.push({uid:t.uid,name:t.name,url:s()(t.response,r.resPathOfUrl,t.url)}):e.push(t)),e},[]))},removeUpload:function(e,t){this.elFileList=t,this.$emit("update:fileList",t)},previewUpload:function(e){window.open(e.url)}}},r);l.options.__file="src/ElMultipleUpload.vue",t.default=l.exports}]).ElMultipleUpload}(n(4),n(5),n(6))},function(e,t){e.exports=ELEMENT},function(e,t,n){window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t){e.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,r={message:"",error:0,validate:!0};if("[object File]"===Object.prototype.toString.call(e)){void 0===n&&(n=1024e3);var o=!0,i="",a=e.name.lastIndexOf(".");-1!==a&&(i=e.name.substring(a));var u=i?i.substring(1):e.type&&e.type.split("/")[0];e.type&&t&&(o=t.split(",").some(function(t){return(t=t.trim())&&(new RegExp("^"+t).test(e.type)||new RegExp("^"+t).test(i))}),void 0===n&&(/^\.(png|jpe?g|gif|svg|webp)/.test(i)||/^image/.test(e.type)?n=10240:(/^\.(ogg|mp3|wav|flac|aac)/.test(i)||/^audio/.test(e.type))&&(n=102400)));var s=!0;if(n&&(s=e.size/1024<n),o||(r.message="只能上传"+u+"!",r.error=1,r.validate=!1),!s){var l=n>=1024?n/1024+"M":n+"KB";r.message="上传"+u+"大小不能超过"+l+"!",r.error=2,r.validate=!1}}else r.message="file参数必须为File数据类型",r.error=3,r.validate=!1;return r}}})},function(e,t,n){window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}({6:function(e,t){e.exports=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e)&&"[object String]"===Object.prototype.toString.call(t)){for(var r=t.split("."),o=0,i=r.length;"[object Object]"===Object.prototype.toString.call(e)&&o<i;)e=e[r[o++]];return o&&o==i?e:n}return n}}})},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h1",[e._v("上传的mock演示，response永远是一样的数据")]),e._v(" "),n("el-multiple-upload",{ref:"mUpload",attrs:{"file-list":e.fileList},on:{"update:fileList":function(t){e.fileList=t}}})],1)};i._withStripped=!0;var a=n(1),u=new(n.n(a).a)("example-ucloud","https://private-87040-publicexample.apiary-mock.com/upload","https://private-87040-publicexample.apiary-mock.com/upload/token");function s(e){var t=e.file;if("[object File]"!==Object.prototype.toString.call(t))throw new Error("file参数必须为File数据类型");return new Promise(function(n,r){u.PREFIX="example/".concat(t.type);u.hitSliceUpload(t,function(e){"[object Object]"!==Object.prototype.toString.call(e)&&(e={Key:t.name}),e.url="http://dummyimage.com/200x100/50B347/FFF&text=".concat(e.Key),console.log("success",e),n({data:e})},function(e){r(new Error("上传失败"))},function(t){"[object Object]"!==Object.prototype.toString.call(t)&&(t={value:0}),console.log("progress",t),t.percent=100*t.value,e.onProgress(t)})})}window.ElMultipleUploadOptions={upload:s},n(3);var l=function(e,t,n,r,o,i,a,u){var s,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),a?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},l._ssrRegister=s):o&&(s=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),s)if(l.functional){l._injectStyles=s;var c=l.render;l.render=function(e,t){return s.call(t),c(e,t)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,s):[s]}return{exports:e,options:l}}({name:"App",data:function(){return{fileList:[{name:"food.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{name:"food2.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]}},computed:{upload:function(){return s}},watch:{fileList:{handler:function(e,t){console.log("fileList",e),console.log("elFileList",this.$refs.mUpload.elFileList)}}}},i,[],!1,null,null,null);l.options.__file="example/components/App.vue";var c=l.exports;new o.a({el:"#app",render:function(e){return e(c)}})}]);