import { useUrlStore } from "@/store/useUrlStore"
import { useRouter } from "next/navigation"

export const fetchData = async <T>(url: string, option: RequestInit = {},shouldRetry = true): Promise<T> => {

  const { method, headers, ...otherOption } = option
  
  const res = await fetch(url, {
    ...otherOption,
    method: method ?? "GET",
    credentials: "include",
    headers: headers ?? {},
  })

  if (res.status === 401 && shouldRetry) {
    await refreshData()
    return fetchData<T>(url, option, false)
  }

  if (!res.ok) {
    throw new Error(`Terjadi kesalahan HTTP dengan status: ${res.status}`)
  }

  return (await res.json()) as T
}

const refreshData = async () => {
  const url_refresh = useUrlStore.getState().URL.APP
    const router = useRouter()
  const res = await fetch(`${url_refresh}/api/v1/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    // redirect ke login
    router.push("/login")
    throw new Error("Refresh token tidak valid")
  }
}