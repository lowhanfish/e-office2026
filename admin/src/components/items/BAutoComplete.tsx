"use client"

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export interface BAutoCompleteProps<T> {
    title?: ReactNode;
    placeholder?: string;
    options: readonly T[];
    getOptionLabel: (item: T) => string;
    getOptionKey?: (item: T) => string | number;
    children: (item: T) => ReactNode;
    onChange: (item: T | null) => void;
    inputValue?: string;
    onInputChange?: (text: string) => void;
    filterOption?: (item: T, text: string) => boolean;
    emptyMessage?: ReactNode;
    disabled?: boolean;
}

export default function BAutoComplete<T>({
    title, placeholder, options, getOptionLabel, getOptionKey, children,
    onChange, inputValue, onInputChange, filterOption, emptyMessage = 'Data tidak ditemukan', disabled = false,
}: BAutoCompleteProps<T>) {
    const id = useId()
    const boxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const [internalText, setText] = useState('')
    const text = inputValue ?? internalText
    const [open, setOpen] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const [selected, setSelected] = useState(false)

    const filteredOptions = options.filter((item) => filterOption
        ? filterOption(item, text)
        : getOptionLabel(item).toLowerCase().includes(text.toLowerCase()))
    const activeIndex = highlightIndex < filteredOptions.length ? highlightIndex : -1

    useEffect(() => {
        const list = listRef.current
        const option = list?.querySelector<HTMLElement>(`[data-option-index="${activeIndex}"]`)
        if (!open || !list || !option) return

        const listBounds = list.getBoundingClientRect()
        const optionBounds = option.getBoundingClientRect()
        if (optionBounds.top < listBounds.top) {
            list.scrollTop -= listBounds.top - optionBounds.top
        } else if (optionBounds.bottom > listBounds.bottom) {
            list.scrollTop += optionBounds.bottom - listBounds.bottom
        }
    }, [open, activeIndex])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setOpen(false)
                setHighlightIndex(-1)
            }
        }
        window.addEventListener('mousedown', handleClickOutside)
        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectOption = (item: T) => {
        setText(getOptionLabel(item))
        setSelected(true)
        setOpen(false)
        setHighlightIndex(-1)
        onChange(item)
        if (inputValue !== undefined) onInputChange?.(getOptionLabel(item))
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setOpen(true)
            if (filteredOptions.length === 0) return
            setHighlightIndex(event.key === 'ArrowDown'
                ? (activeIndex + 1) % filteredOptions.length
                : activeIndex <= 0 ? filteredOptions.length - 1 : activeIndex - 1)
        } else if (event.key === 'Enter' && open) {
            event.preventDefault()
            if (activeIndex >= 0) selectOption(filteredOptions[activeIndex])
        } else if (event.key === 'Escape') {
            setOpen(false)
            setHighlightIndex(-1)
        }
    }

    return (
        <div ref={boxRef} className='w-full relative'>
            {title && <label htmlFor={id} className='text-[12px] text-b-gray-3 font-roboto'>{title}</label>}
            <div className='relative flex justify-center items-center'>
                <input
                    ref={inputRef}
                    id={id}
                    role='combobox'
                    aria-label={typeof title === 'string' ? title : placeholder ?? 'Cari pilihan'}
                    aria-autocomplete='list'
                    aria-expanded={open && !disabled}
                    aria-controls={`${id}-listbox`}
                    aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
                    autoComplete='off'
                    disabled={disabled}
                    placeholder={placeholder}
                    value={text}
                    onFocus={() => setOpen(true)}
                    onClick={() => setOpen(true)}
                    onBlur={(event) => {
                        if (!event.currentTarget.parentElement?.parentElement?.contains(event.relatedTarget)) {
                            setOpen(false)
                            setHighlightIndex(-1)
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => {
                        const nextText = event.target.value
                        setText(nextText)
                        setOpen(true)
                        setHighlightIndex(-1)
                        if (selected || inputValue !== undefined) onChange(null)
                        setSelected(false)
                        onInputChange?.(nextText)
                    }}
                    className='w-full border bg-b-gray-2/35 border-b-gray-3/40 pl-2 pr-10 py-1.5 text-[14px] rounded-[5px] disabled:opacity-50'
                />
                {text && !disabled && (
                    <button
                        type='button'
                        aria-label='Hapus pilihan'
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                            setText('')
                            setSelected(false)
                            setOpen(true)
                            setHighlightIndex(-1)
                            onChange(null)
                            onInputChange?.('')
                            inputRef.current?.focus()
                        }}
                        className='absolute right-2 text-[12px] font-semibold text-b-gray-4 rounded-full bg-b-gray-2 hover:bg-b-gray-2/70 w-6 h-6 cursor-pointer shadow-sm'
                    >
                        x
                    </button>
                )}
            </div>
            {open && !disabled && (
                <div ref={listRef} id={`${id}-listbox`} role='listbox' className='absolute bg-b-gray-3 w-full mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-[6px] z-50 shadow-lg'>
                    {filteredOptions.length === 0 && <div role='status' className='p-2 text-[14px]'>{emptyMessage}</div>}
                    {filteredOptions.map((item, index) => (
                        <div
                            id={`${id}-option-${index}`}
                            data-option-index={index}
                            key={getOptionKey ? getOptionKey(item) : index}
                            role='option'
                            aria-selected={index === activeIndex}
                            onMouseEnter={() => setHighlightIndex(index)}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => selectOption(item)}
                            className={`${index === activeIndex ? 'bg-b-gray-1' : 'bg-b-gray-2'} hover:bg-b-gray-1 flex flex-col m-1 p-1 rounded-[3px] cursor-pointer text-[14px]`}
                        >
                            {children(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
