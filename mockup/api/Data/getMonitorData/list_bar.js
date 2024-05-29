const result = {
    "data": [
        {
            "date": "2024-05-24",
            "energy_used": 2
        },
        {
            "date": "2024-05-27",
            "energy_used": 24.3
        }
    ],
    "msg": "success",
    "status": 1
};

exports.getData = (method, data) => {
    // 可根据data进行操作
    return JSON.stringify(result);
};
