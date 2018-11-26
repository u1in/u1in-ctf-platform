function _format(type, data) {
    if(type == undefined || data == undefined) {
        return false;
    }
    if(type === Array) {
        return Array.isArray(data);
    }
    else if(type === Number) {
        return (typeof(data) === 'number');
    }
    else if(type === String) {
        return (typeof (data) === 'string');
    }
    else if(type === Object) {
        return (typeof (data) === 'object');
    }
}
function process(format, data) {
    if (Array.isArray(format) || typeof(format) != 'object') {
        return false;
    }

    if(Array.isArray(data)) {
        let _filter = (_data) => {
            let result = {};
            for (let i in _data) {
                if(Object.keys(format).indexOf(i) >= 0) {
                    if (_format(format[i], _data[i])) {
                        result[i] = _data[i];
                    }
                }
            }
            return result;
        }
        return data.map(_filter);
    }
    else if(typeof(data) === 'object') {
        //尚未测试
        let result = {};
        for(let i in _data) {
            if (Object.keys(format).indexOf(i) >= 0) {
                if (_format(format[i], _data[i])) {
                    result[i] = _data[i];
                }
            }
        }
        return result;
    }
    else {
        return false;
    }
}

module.exports = process;