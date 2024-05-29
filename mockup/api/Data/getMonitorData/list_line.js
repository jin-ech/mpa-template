const result = {
    "data": [
        {
            "date": "2024-05-24 17:43:22",
            "value": 9
        },
        {
            "date": "2024-05-24 17:48:28",
            "value": 81
        },
        {
            "date": "2024-05-24 17:49:43",
            "value": 2
        },
        {
            "date": "2024-05-24 17:50:11",
            "value": 26
        },
        {
            "date": "2024-05-24 17:50:58",
            "value": 64
        },
        {
            "date": "2024-05-24 17:50:59",
            "value": 87
        },
        {
            "date": "2024-05-24 17:52:55",
            "value": 10
        },
        {
            "date": "2024-05-24 17:53:20",
            "value": 40
        }
    ],
    "msg": "success",
    "status": 1
};

exports.getData = (method, data) => {
    // 可根据data进行操作
    return JSON.stringify(result);
};
