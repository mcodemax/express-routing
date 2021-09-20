/**turn str into an arr 
 * returns an Arr of numbers
*/
function turnToArr(str){
    const numsArr = str.split(',');
    return numsArr.map(e => {
        if(isNaN(e)){//if e is not a number return e
            return `${e} is NaN`;
        }else if(e === '' || e.split(' ').join("") === ''){
            return 'Empty String can not be used in calculations';
        }else{
            return parseInt(e, 10);
        }
    });
};

/**I: Arr of numbers, or error(s)
 * O: Mean or single error
 */
function findMean(arr){
    let sum = 0;
    let totalNums = 0;
    for(let num of arr){
        if(isNaN(num)){
            return new Error(num);
        }
        sum+=num;
        totalNums++;
    }
    return sum / totalNums;
}

function findMedian(numsArr){
    // sort and get the middle element

    numsArr.sort((a, b) => a - b);

    let middleIndex = Math.floor(numsArr.length / 2);
    let median;

    if (numsArr.length % 2 === 0) {
        median = (numsArr[middleIndex] + numsArr[middleIndex - 1]) / 2;
    } else {
        median = numsArr[middleIndex];
    }
    return median
}

module.exports = { turnToArr, findMedian, findMean };