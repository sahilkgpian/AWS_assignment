exports.handler = async (event) => {
    const { num1, num2 } = JSON.parse(event.body);
    if (num1 === undefined || num2 === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Both num1 and num2 are required." }),
        };
    }
    const result = num1 + num2;
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    };
};
