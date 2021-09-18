const express = require('express');
const ExpressError = require('./expressError')
const operates = require('./operates.js')

const app = express();

app.use(express.json()); //.use is middlewear, on eevery reqeust do this
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res, next) {//all these exec async
    
    const nums = req.query.nums;
    const numsArr = operates.turnToArr(nums)
    let totalNums = 0;
    let sum = 0;

    try {
        for(let num of numsArr){
            if(isNaN(num)) throw new ExpressError(`${num} is NaN`, 400);//if NaN return err
            sum+=num;
            totalNums++;
            console.log({numsArr, sum, totalNums})
        }    
    } catch (err) {
        return next(err);
    }
    
    //turn nums into an array, iterate thru array

    //if successfull
    return res.json({ operation: "mean", value: sum / totalNums });
});

app.get('/median', function(req, res) {
    console.log(`po`)
    return res.send('Dogs go brk brk');
});
  
app.get('/mode', function(req, res) {
    return res.send('Dogs go brk brk');
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