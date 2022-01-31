const letters = 'abcdefghijklmnopqrstuvwxyz';

const types = ['Basic', 'Seasonal' ,'Unlimited'];

const createString = () =>{
    let couponName = '';
    const length = Math.floor((Math.random() * 10) + 1);
    for (let i = 0; i < length; i++) {
        const letterIndex = Math.floor(Math.random() * letters.length);
        couponName += letters[letterIndex];
    }
    return couponName;
}

const createType = () =>{
    const index = Math.floor(Math.random() * types.length);
    return types[index];
}

const createDate = () =>{
    const day = Math.floor(Math.random() * 30 + 1);
    const month = Math.floor(Math.random() * 12 + 1);
    const year = Math.floor(Math.random() * 25 + 2000);
    return new Date(year, month, day);
}

const createNumber = () =>{
    return Math.floor(Math.random() * 1000 + 1000);
}

exports.createCoupons = () => {
    const coupons = [];
    let index = 0;
    for (let i = 0; i < 10000; i++) {   
        coupons[index++] = {
            "couponName": createString(),
            "type": createType(),
            "startDate": createDate(),
            "endDate": createDate(),
            "discountAmount": createNumber(),
            "userGroupName": createString()
        }
    } 
    return coupons;
}
