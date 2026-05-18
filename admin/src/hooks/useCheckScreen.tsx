"use client"
import { useState, useEffect } from "react"

type screenSizeType = "Mobile" | "Tablet" | "Desktop"


const useCheckScreen = () => {
    const [screenSize, setScreenSize] = useState<number>(0)
    const [layer, setLayer] = useState<screenSizeType>("Mobile")

    useEffect(() => {

        // Fungsi ini hanya akan jalan di Client (setelah mounting)
        const handleResize = () => {
            setScreenSize(window.innerWidth)
            if (window.innerWidth < 768) {
                setLayer("Mobile")
            } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setLayer("Tablet")
            } else if (window.innerWidth >= 1024) {
                setLayer("Desktop")
            } else {
                setLayer("Desktop")
            }
        }

        // Langsung panggil untuk mendapatkan nilai pertama kali di browser
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    // return screenSize

    return {
        width: screenSize,
        screen: layer
    }
}

export default useCheckScreen