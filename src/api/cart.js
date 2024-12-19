import request from "./request";

export async function addToCart(productId, amount) {
    return request('/api/cart', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            type: "add",
            product: {
                id: productId,
                amount
            }
        })
    }).then(async data => await data.json())
}

export async function removeFromCart(productId) {
    return request('/api/cart', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            type: "substract",
            product: {
                id: productId,
            }
        })
    }).then(async data => await data.json())
}

export async function setProductCart(productId, amount) {
    return request('/api/cart', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            type: "set",
            product: {
                id: productId,
                amount
            }
        })
    }).then(async data => await data.json())
}

export async function getCart() {
    const data = await request('/api/cart')

    return data
}