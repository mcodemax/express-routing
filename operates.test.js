const {
    findMean,
    findMedian,
    findMode,
} = require("./operates");

test("finds median of an even arr", function(){ 
        expect(findMedian([1, -1, 4, 2])).toEqual(1.5)
    }
)

test("finds the median of an odd arr", function () { 
    expect(findMedian([1, -1, 4])).toEqual(1)
})



test("finds the mean of an array of numbers", function () { 
        expect(findMean([1,-1,4,2])).toEqual(1.5)
})


test("finds the mode", function () { 
        expect(findMode([1,1,1,5,5,2,2,3])).toEqual(1)
})
