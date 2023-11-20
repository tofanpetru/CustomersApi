export function dateTimeNowToString() {
    return new Date.now().toString();
}

export function logToConsole(msg) {
    console.log(msg)
}

//TODO: us this to mock callbacks
export function extract(payload, property, callback) {
    const x = payload[property]
    callback(x)
}