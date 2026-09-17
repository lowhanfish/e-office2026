"use client"

import { useState } from 'react'
import CodeWrapper from './CodeWrapper'
import BCheckBox from '@/components/items/BCheckBox'

const InputDataRd = () => {

    const [data, setData] = useState<boolean>(false);

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                <div className='col-span-6 flex gap-2'>

                    <BCheckBox
                        checked={data}
                        value="size xs"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='b-gray' title='Size : xs '
                    />

                    <BCheckBox
                        checked={data}
                        value="size sm"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="sm" color='b-gray' title='Size : sm '
                    />

                    <BCheckBox
                        checked={data}
                        value="size md"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="md" color='b-gray' title='Size : md '
                    />

                    <BCheckBox
                        checked={data}
                        value="size lg"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="lg" color='b-gray' title='Size : lg '
                    />

                    <BCheckBox
                        checked={data}
                        value="size xl"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xl" color='b-gray' title='Size : xl '
                    />

                </div>

                <div className='col-span-6 flex gap-2'>

                    <BCheckBox
                        checked={data}
                        value="gray color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='gray' title='color : gray '
                    />

                    <BCheckBox
                        checked={data}
                        value="yellow color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='yellow' title='color : yellow '
                    />

                    <BCheckBox
                        checked={data}
                        value="green color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='green' title='color : green '
                    />

                    <BCheckBox
                        checked={data}
                        value="blue color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='blue' title='color : blue '
                    />

                    <BCheckBox
                        checked={data}
                        value="red color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='red' title='color : red '
                    />

                </div>
            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}

export default InputDataRd



const codeString = `
"use client"

import { useState } from 'react'
import BCheckBox from '@/components/items/BCheckBox'

const InputDataRd = () => {

    const [data, setData] = useState<boolean>(false);

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                <div className='col-span-6 flex gap-2'>

                    <BCheckBox
                        checked={data}
                        value="size xs"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='b-gray' title='Size : xs '
                    />

                    <BCheckBox
                        checked={data}
                        value="size sm"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="sm" color='b-gray' title='Size : sm '
                    />

                    <BCheckBox
                        checked={data}
                        value="size md"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="md" color='b-gray' title='Size : md '
                    />

                    <BCheckBox
                        checked={data}
                        value="size lg"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="lg" color='b-gray' title='Size : lg '
                    />

                    <BCheckBox
                        checked={data}
                        value="size xl"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xl" color='b-gray' title='Size : xl '
                    />

                </div>

                <div className='col-span-6 flex gap-2'>

                    <BCheckBox
                        checked={data}
                        value="gray color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='gray' title='color : gray '
                    />

                    <BCheckBox
                        checked={data}
                        value="yellow color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='yellow' title='color : yellow '
                    />

                    <BCheckBox
                        checked={data}
                        value="green color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='green' title='color : green '
                    />

                    <BCheckBox
                        checked={data}
                        value="blue color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='blue' title='color : blue '
                    />

                    <BCheckBox
                        checked={data}
                        value="red color"
                        onChange={
                            (checked, value) => {
                                console.log(checked)
                                console.log(value)
                                setData(checked); //Set your data here
                            }
                        }
                        size="xs" color='red' title='color : red '
                    />

                </div>
            </div>
        </div>
    )
}

export default InputDataRd
    
`
