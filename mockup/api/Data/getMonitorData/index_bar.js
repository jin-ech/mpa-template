const result = {
    "data": [
        {
            "date": "2024-05-24",
            "energy_used": 463.6
        },
        {
            "date": "2024-05-27",
            "energy_used": 650.9
        }
    ],
    "msg": "success",
    "status": 1
};

exports.getData = (method, data) => {
    // 可根据data进行操作
    return JSON.stringify(result);
};
