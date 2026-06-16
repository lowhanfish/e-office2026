"use client"

import { useState } from 'react'
import CodeWrapper from './CodeWrapper'
import BRadioButton from '@/components/items/BRadioButton'

const BInputRadioButton = () => {
    const [check, setCheck] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("sm");

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                <div className='col-span-6 flex gap-2'>

                    <BRadioButton
                        title="size = xs"
                        size='xs'
                        name="Size" // Radio collection name
                        value="Extra Small"
                        checked={selected === String("Extra Small")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = sm"
                        size='sm'
                        name="Size" // Radio collection name
                        value="Small"
                        checked={selected === String("Small")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = md"
                        size='md'
                        name="Size" // Radio collection name
                        value="Medium"
                        checked={selected === String("Medium")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = lg"
                        size='lg'
                        name="Size" // Radio collection name
                        value="Large"
                        checked={selected === String("Large")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = xl"
                        size='xl'
                        name="Size" // Radio collection name
                        value="Extra Large"
                        checked={selected === String("Extra Large")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                </div>

                <div className='col-span-6 flex gap-2'>

                    <BRadioButton
                        title="color = gray"
                        size='md'
                        color='gray'
                        name="Color" // Radio collection name
                        value="Gray"
                        checked={selected === String("Gray")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = yellow"
                        size='md'
                        color='yellow'
                        name="Color" // Radio collection name
                        value="Yellow"
                        checked={selected === String("Yellow")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = blue"
                        size='md'
                        color='blue'
                        name="Color" // Radio collection name
                        value="Blue"
                        checked={selected === String("Blue")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = green"
                        size='md'
                        color='green'
                        name="Color" // Radio collection name
                        value="Green"
                        checked={selected === String("Green")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = red"
                        size='md'
                        color='red'
                        name="Color" // Radio collection name
                        value="Red"
                        checked={selected === String("Red")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                </div>
            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}

export default BInputRadioButton



const codeString = `
"use client"

import { useState } from 'react'
import BRadioButton from '@/components/items/BRadioButton'

const BInputRadioButton = () => {
    const [check, setCheck] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("sm");

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                <div className='col-span-6 flex gap-2'>

                    <BRadioButton
                        title="size = xs"
                        size='xs'
                        name="Size" // Radio collection name
                        value="Extra Small"
                        checked={selected === String("Extra Small")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = sm"
                        size='sm'
                        name="Size" // Radio collection name
                        value="Small"
                        checked={selected === String("Small")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = md"
                        size='md'
                        name="Size" // Radio collection name
                        value="Medium"
                        checked={selected === String("Medium")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = lg"
                        size='lg'
                        name="Size" // Radio collection name
                        value="Large"
                        checked={selected === String("Large")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                    <BRadioButton
                        title="size = xl"
                        size='xl'
                        name="Size" // Radio collection name
                        value="Extra Large"
                        checked={selected === String("Extra Large")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                </div>

                <div className='col-span-6 flex gap-2'>

                    <BRadioButton
                        title="color = gray"
                        size='md'
                        color='gray'
                        name="Color" // Radio collection name
                        value="Gray"
                        checked={selected === String("Gray")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = yellow"
                        size='md'
                        color='yellow'
                        name="Color" // Radio collection name
                        value="Yellow"
                        checked={selected === String("Yellow")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = blue"
                        size='md'
                        color='blue'
                        name="Color" // Radio collection name
                        value="Blue"
                        checked={selected === String("Blue")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = green"
                        size='md'
                        color='green'
                        name="Color" // Radio collection name
                        value="Green"
                        checked={selected === String("Green")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />
                    <BRadioButton
                        title="color = red"
                        size='md'
                        color='red'
                        name="Color" // Radio collection name
                        value="Red"
                        checked={selected === String("Red")}
                        onChange={(value) => {
                            console.log(value)
                            setSelected(value)
                        }}
                    />

                </div>
            </div>
        </div>
    )
}

export default BInputRadioButton
    
`
