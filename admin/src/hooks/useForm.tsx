import { useState, useEffect } from 'react'

const useForm = <T,>(initialValue: T) => {
    const [form, setForm] = useState<T>(initialValue)

    const setItemForm = (key: keyof T, value: any) => {
        setForm((prevForm) => ({
            ...prevForm,
            [key]: value
        }))
    }

    const resetForm = () => {
        setForm(initialValue)
    }

    return {
        form, setItemForm, resetForm
    }
}

export default useForm
