var constraints = {
    fullname: {
        presence: true,
        length: {
            maximum: 75,
            message: "must be at 75 characters max"
        }
    },
    fulladdress: {
        presence: true,
        length: {
            maximum: 250,
            message: "must be at 250 characters max"
        }
    },
    telephone: {
        presence: true,
        length: {
            maximum: 20,
            message: "must be at 20 characters max"
        },
        format: {
            pattern: /^([0-9]){2,20}$/,
            message: "must consist of numeric characters only"
        }
    }
};


