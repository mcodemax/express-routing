const express = require('express');
const ExpressError = require('./expressError')
const operates = require('./operates.js')

const app = express();

app.use(express.json()); //.use is middlewear, on eevery reqeust do this
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res, next) {//all these exec async
    const nums = req.query.nums;
    const numsArr = operates.turnToArr(nums);
    const mean = operates.findMean(numsArr);
    
    if(!nums){
        throw new ExpressError(`You must pass in numbers`, 400);
    }

    if(mean instanceof Error) {
        throw new ExpressError(mean.message, 400);
    }

    return res.json({ operation: "mean", value: mean });
});

app.get('/median', function(req, res, next) {
    const nums = req.query.nums;
    const numsArr = operates.turnToArr(nums);
    const median = operates.findMedian(numsArr);
    
    if(!nums){
        throw new ExpressError(`You must pass in numbers`, 400);
    }

    if(median instanceof Error) {
        throw new ExpressError(median.message, 400);
    }

    return res.json({ operation: "median", value: median });
});
  
app.get('/mode', function(req, res, next) {
    const nums = req.query.nums;
    const numsArr = operates.turnToArr(nums);
    const mode = operates.findMode(numsArr);
    
    console.log({numsArr})

    if(!nums){
        throw new ExpressError(`You must pass in numbers`, 400);
    }

    if(mode instanceof Error) {
        throw new ExpressError(mode.message, 400);
    }

    return res.json({ operation: "mode", value: mode });
});
  
app.use((err, req, res, next) => { //having 4 args tels express it's an err handler
    //default status is 500 internal server err
    let status = err.status || 500;
    let msg = err.msg;

    //set status and alert user
    return res.status(status).json({
        error: { msg, status }
    })
});

app.listen(3000, () => { //always have this at END of file, b/c need definied routes b4 you start listening
    console.log('Server running on port 3000')
});


//have node as part of path that nvm uses so don't have to reinstall it all the time