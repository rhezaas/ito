export enum CODES {
    CODE_400 = '400|Bad Request',
    CODE_401 = '401|Unauthorized',
    CODE_402 = '402|Payment Required',
    CODE_403 = '403|Forbidden',
    CODE_404 = '404|Not Found',
    CODE_405 = '405|Method Not Allowed',
    CODE_406 = '406|Not Acceptable',
    CODE_407 = '407|Proxy Authentication Required',
    CODE_408 = '408|Request Timeout',
    CODE_409 = '409|Conflict',
    CODE_410 = '410|Gone',
    CODE_411 = '411|Length Required',
    CODE_412 = '412|Precondition Failed',
    CODE_413 = '413|Payload Too Large',
    CODE_414 = '414|URI Too Long',
    CODE_415 = '415|Unsupported Media Type',
    CODE_416 = '416|Requested Range Not Satisfiable',
    CODE_417 = '417|Expectation Failed',
    CODE_421 = '421|Misdirected Request',
    CODE_426 = '426|Upgrade Required',
    CODE_428 = '428|Precondition Required',
    CODE_429 = '429|Too Many Requests',
    CODE_431 = '431|Request Header Fields Too Large',
    CODE_451 = '451|Unavailable For Legal Reasons',
    CODE_500 = '500|Internal Server Error',
    CODE_501 = '501|Not Implemented',
    CODE_502 = '502|Bad Gateway',
    CODE_503 = '503|Service Unavailable',
    CODE_504 = '504|Gateway Timeout',
    CODE_505 = '505|HTTP Version Not Supported',
    CODE_506 = '506|Variant Also Negotiates',
    CODE_507 = '507|Variant Also Negotiates',
    CODE_511 = '511|Network Authentication Required'
}

export class ErrorModel {
    public static new(_code: CODES, _option?: any) {
        const e = _code.split('|')

        const code = parseInt(e[0], 10)
        const message = e[1]
        const detail = _option

        return {
            code,
            message,
            detail
        }
    }
}