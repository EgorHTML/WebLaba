export function getRequestBody(req) {
    let body = [];
    return new Promise((res, rej) => {
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                try {
                    body = Buffer.concat(body).toString()

                    res(body)

                } catch (error) {
                    console.error(error);
                    rej(error)
                }
            })
            .on('error', error => {
                console.error(error.stack);
                rej(error)
            });
    })
}