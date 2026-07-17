import { useState, useEffect } from 'react'

const useForm = <T,>(initialValue: T) => {
    const [form, setForm] = useState<T>(initialValue)

    const setItemForm = (key: keyof T, value: any) => {
        setForm((prevForm) => ({
            ...prevForm,
            [key]: value
        }))
    }

    const emptyForm = () => {
        setForm(initialValue)
    }

    return {
        form, setForm, setItemForm, emptyForm
    }
}

export default useForm
