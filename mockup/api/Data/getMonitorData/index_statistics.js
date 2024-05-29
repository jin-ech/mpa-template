const result = {
    "data": {
        "count": 32,
        "total": 173.3,
        "month_total": 173.3,
        "day_total": 173.3,
        "power_totle": 1884
    },
    "msg": "success",
    "status": 1
};

exports.getData = (method, data) => {
    // 可根据data进行操作
    return JSON.stringify(result);
};
