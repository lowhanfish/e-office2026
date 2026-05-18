"use client"
import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { BsFolder2Open, BsFileText } from "react-icons/bs";

interface BInputFileProps {
    accept?: string
    title: string,
    placeholder: string,
    onFileSelect: (files: File | FileList | null) => void,
    multiple?: boolean

}

const BInputFile = ({ accept, title, placeholder, onFileSelect, multiple = false }: BInputFileProps) => {
    const [displayText, setDisplayText] = useState("");
    const [numFile, setNumFile] = useState(0);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const count = files.length;
            setNumFile(count);

            if (multiple) {
                setDisplayText(`${count} file terpilih`);
                onFileSelect(files);
            } else {
                setDisplayText(files[0].name);
                onFileSelect(files[0]);
            }
        } else {
            setNumFile(0);
            setDisplayText("");
            onFileSelect(null);
        }

        // Trik agar bisa pilih file yang sama setelah dihapus
        e.target.value = "";
    }

    return (
        <div>
            <span className='text-[12px] text-b-gray-3 font-roboto'>{title}</span>
            <div className='w-full'>
                <label
                    className=' w-full border bg-b-gray-2/35 border-b-gray-3/40 px-2 py-1.5 text-[14px] rounded-[5] flex justify-between items-center gap-1'
                >
                    <input
                        onChange={handleFileChange}
                        className='hidden'
                        type="file"
                        accept={accept || "*"}
                        multiple={multiple}

                    // accept="
                    //     image/*, 
                    //     video/*, 
                    //     application/pdf, 
                    //     .doc, .docx, 
                    //     application/msword, 
                    //     application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
                    //     .xls, .xlsx, 
                    //     application/vnd.ms-excel, 
                    //     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                    // "


                    />
                    {numFile > 0 && (
                        <div className='shrink-0 mr-2 bg-b-blue-4 h-5 w-5 flex justify-center items-center rounded-full'>
                            <span className='text-b-gray-1 text-[10px]'>{numFile}</span>
                        </div>
                    )}
                    <div className='flex-1 min-w-0'>
                        <span className='text-b-gray-4 block w-full truncate'>{displayText || placeholder}</span>
                    </div>
                    <div>
                        <BsFolder2Open />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default BInputFile
