const result = {
    "data": [
        {
            "date": "2024-05-27 11:46:10",
            "value": 1898
        },
        {
            "date": "2024-05-27 11:46:31",
            "value": 1476
        },
        {
            "date": "2024-05-27 11:46:53",
            "value": 1567
        }
    ],
    "msg": "success",
    "status": 1
};

exports.getData = (method, data) => {
    // 可根据data进行操作
    return JSON.stringify(result);
};
