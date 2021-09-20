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

    //console.log ({nums, numsArr, mean})
    
    if(!nums){
        throw new ExpressError(`You must pass in numbers`, 400);
    }

    if(mean instanceof Error) {
        throw new ExpressError(mean.message, 400);
    }

    return res.json({ operation: "mean", value: mean });
});

app.get('/median', function(req, res) {
    console.log(`po`)
    return res.send('Dogs go brk brk');
});
  
app.get('/mode', function(req, res, next) {
    const nums = req.query.nums;
    const numsArr = operates.turnToArr(nums)
    const dict = {};
    let modeFreq = 0;
    let mode;//most occurances of a single number

    try {
        if(!nums) throw new ExpressError(`numbers are req'd`, 400);

        for(let num of numsArr){
            if(isNaN(num)) throw new ExpressError(`${num} is NaN`, 400);//if NaN return err, can you return this if you refactor to new func()?

            console.log(`ship ${num}`)
            if(dict[num]){
                dict[num]+=1;
            }else{
                dict[num] = 1;
            }
        }    
    } catch (err) {
        return next(err);
    }

    for(let [k, v] of Object.entries(dict)){
        if(v > modeFreq){//this algo doesn't account if there are multiple modes
            mode = k;
            modeFreq = v;
        }
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