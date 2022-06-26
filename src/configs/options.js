import config from '#config/general.config.js'

export default {
    generatorOption: {
        length: 6,
        numbers: true,
        symbols: false,
        lowercase: false,
        uppercase: false,
        excludeSimilarCharacters: false,
        exclude: false,
        strict: false
    },
    mailOptions: {
        from: config.EMAIL,
        to: '',
        subject: 'Authentication password',
        text: ''
    },
    validEmailRegEx: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
}