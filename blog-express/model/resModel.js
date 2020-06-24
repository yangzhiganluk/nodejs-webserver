class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            // 要求传入的data为对象类型，message为字符串类型，当传入第一个为字符串时，进行如下操作
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message) //执行父类constructor
        this.errno = 0
    }
}

class ErroModel extends BaseModel {
    constructor(data, message) {
        super(data, message) //执行父类constructor
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErroModel
}