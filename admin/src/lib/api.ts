

export async function requestJSON <T>(url:string, options?:RequestInit) : Promise<T> {
    const res = await fetch(url, {
        headers: {
            'Content-Type' : "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });

    if(!res.ok){
        throw new Error(`Request gagal: ${res.status}`);
    }
    return res.json()


}