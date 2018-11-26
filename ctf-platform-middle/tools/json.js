function rj(code, message, data) {
    try {
        data = JSON.parse(data);
    } catch (error) {
        
    }
    return {
        code,
        message,
        data,
    }
}

module.exports = rj;