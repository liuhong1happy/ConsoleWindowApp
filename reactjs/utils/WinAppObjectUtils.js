module.exports = {
    isNull:function(obj){
        for(var k in obj){
            return false;
        }
        return true;
    }
};