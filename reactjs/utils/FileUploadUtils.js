var WinAppServerActionCreators = require('../actions/WinAppServerActionCreators');
var FileManageActionCreators =  require('../actions/FileManageActionCreators');
var CryptoJS = require("crypto-js");

var  swapendian32 = function(val) {
    return (((val & 0xFF) << 24)
       | ((val & 0xFF00) << 8)
       | ((val >> 8) & 0xFF00)
       | ((val >> 24) & 0xFF)) >>> 0;

}
var arrayBufferToWordArray = function(arrayBuffer) {
    var fullWords = Math.floor(arrayBuffer.byteLength / 4);
    var bytesLeft = arrayBuffer.byteLength % 4;

    var u32 = new Uint32Array(arrayBuffer, 0, fullWords);
    var u8 = new Uint8Array(arrayBuffer);

    var cp = [];
    for (var i = 0; i < fullWords; ++i) {
        cp.push(swapendian32(u32[i]));
    }

    if (bytesLeft) {
        var pad = 0;
        for (var i = bytesLeft; i > 0; --i) {
            pad = pad << 8;
            pad += u8[u8.byteLength - i];
        }

        for (var i = 0; i < 4 - bytesLeft; ++i) {
            pad = pad << 8;
        }

        cp.push(pad);
    }

    return CryptoJS.lib.WordArray.create(cp, arrayBuffer.byteLength);
};
var progressiveRead = function(file, work, done) {
    var chunkSize = 204800; // 20KiB at a time
    var pos = 0;
    var reader = new FileReader();

    function progressiveReadNext() {
        var end = Math.min(pos + chunkSize, file.size);

        reader.onload = function (e) {
            pos = end;
            work(e.target.result, pos, file);
            if (pos < file.size) {
                setTimeout(progressiveReadNext, 0);
            }
            else {
                // Done
                done(file);
            }
        }

        if (file.slice) {
            var blob = file.slice(pos, end);
        }
        else if (file.webkitSlice) {
            var blob = file.webkitSlice(pos, end);
        }
        reader.readAsArrayBuffer(blob);
    }

    setTimeout(progressiveReadNext, 0);
};

module.exports = {
      uploadFileList: function(fileList,working,done) {
          this.checkFilesHash(fileList,function(percent){
              working("checking",percent);
          },
          function(results){
              done("checked",results);
          });
          
          
      },
      uploadFile:function(file){
          
      },
      uploadBlob:function(blob){
          
      },
      checkFilesHash:function(fileList,working,done){
            if(fileList && fileList.length==0) return ;
            var filesSize = 0;
            for(var i=0;i< fileList.length;i++){
                filesSize += fileList[i].size;
            }
           var checkHash = this.checkFileHash;
            var doneSize = 0;
            var fileIndex = 0;
            var filesResult = [];
           var progressiveCheckHash = function(){
                
                checkHash(fileList[fileIndex],
                        function(pos){
                               var file = fileList[fileIndex];
                               var progress = Math.floor(((doneSize+pos*file.size/100) / filesSize) * 100);
                               working(progress);
                        },
                        function(result){
                                 var file = fileList[fileIndex];
                                 filesResult[fileIndex] = {
                                     file:file,
                                     result:result
                                 }
                                 doneSize += file.size;
                                 if(doneSize>=filesSize){
                                     done(filesResult)
                                 }else{
                                     fileIndex = fileIndex+1;
                                     setTimeout(progressiveCheckHash,0);
                                 }
                    })
           }
           progressiveCheckHash(fileList);
      },
      checkFileHash:function(file, working, done){
            var start = (new Date).getTime();
            var lastprogress = 0;
            var AlgoInstance = CryptoJS.algo.MD5.create();
            progressiveRead(file,
                function (data, pos, file) {
                    var wordArray = arrayBufferToWordArray(data);
                    AlgoInstance.update(wordArray);
                    var progress = Math.floor((pos / file.size) * 100);
                    if (progress > lastprogress) {
                        working(progress);
                    }
                },
                function (file) {
                    var took = ((new Date).getTime() - start) / 1000;
                    var result = AlgoInstance.finalize();
                    done(result)
                }
);
      }
};