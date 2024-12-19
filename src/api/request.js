export default async function (url, data = {}) {

    return await fetch(url, data).catch(error => {
        if (error.message === 'Unauthorized') {
            if (window.location.pathname !== '/')
                window.location.replace("/");
            throw new Error(response.message || 'Unauthorized')
        }
    })
}