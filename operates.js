/**turn str into an arr */
function turnToArr(str){
    numStr = str.split(',');
    return numStr.map(e => {
        console.log(e)
        if(isNaN(e)){//if e is not a number return e
            return e;
        }else if(e === '' || e.split(' ').join("") === ''){
            return 'empty string'
        }else{
            return parseInt(e, 10);
        }
    });
};

module.exports = { turnToArr };