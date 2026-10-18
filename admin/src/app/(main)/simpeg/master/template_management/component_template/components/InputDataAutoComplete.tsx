"use client"

import { useState } from 'react'
import BAutoComplete from '@/components/items/BAutoComplete'
import CodeWrapper from './CodeWrapper'

const dataArrObj = [
    { id: 1, name: 'Kiken S batara, S.Si.,MT', role: 'Fullstack AI Engineer' },
    { id: 2, name: 'Riswan M Rizal. ST', role: 'Fullstack AI Engineer' },
    { id: 3, name: 'Muh. Hidayat Dermawan. ST', role: 'Fullstack AI Engineer' },
]

type Pegawai = (typeof dataArrObj)[number]

export default function InputDataAutoComplete() {
    const [selected, setSelected] = useState<Pegawai | null>(null)
    const [search, setSearch] = useState('')

    return (
        <details className='group/documentation mt-5 min-w-0 rounded-2xl border border-b-gray-3/20 bg-b-gray-1 text-b-gray-5 shadow-sm'>
            <summary className='relative cursor-pointer list-none rounded-2xl px-5 py-6 pr-16 transition-colors hover:bg-b-gray-2/20 focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-8 sm:pr-20 [&::-webkit-details-marker]:hidden'>
                <span className='inline-flex rounded-full bg-b-gray-3/15 px-3 py-1 font-mono text-xs font-medium'>BAutoComplete</span>
                <h2 className='mt-4 text-2xl font-semibold tracking-tight sm:text-3xl'>Autocomplete dengan tampilan dinamis</h2>
                <p className='mt-3 max-w-2xl text-sm leading-7 opacity-75'>
                    Cari dan pilih data dari array objek. Tentukan sendiri tampilan setiap opsi melalui children,
                    lalu gunakan onChange untuk mengolah data yang dipilih.
                </p>
                <span aria-hidden='true' className='absolute right-5 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-b-gray-3/25 transition-transform group-open/documentation:rotate-180 sm:right-8'>
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round'><path d='m6 9 6 6 6-6' /></svg>
                </span>
            </summary>
            <div className='border-t border-b-gray-3/20'>

            <div className='grid gap-8 px-5 py-7 sm:px-8 lg:grid-cols-2'>
                <div className='min-w-0'>
                    <h3 className='text-base font-semibold'>Coba langsung</h3>
                    <p className='mb-5 mt-2 text-sm leading-6 opacity-75'>Ketik nama pegawai, lalu pilih salah satu hasil pencarian.</p>
                    <div className='rounded-xl border border-b-gray-3/20 bg-b-gray-2/20 p-5'>
                        <BAutoComplete
                            title='Pegawai'
                            placeholder='Cari nama pegawai...'
                            options={dataArrObj}
                            getOptionLabel={(item) => item.name}
                            getOptionKey={(item) => item.id}
                            onInputChange={setSearch}
                            onChange={(item) => setSelected(item)}
                        >
                            {(item) => (
                                <div className='px-2 py-1.5'>
                                    <span className='block text-sm font-medium'>{item.name}</span>
                                    <span className='mt-1 block text-xs opacity-70'>{item.role}</span>
                                </div>
                            )}
                        </BAutoComplete>
                        <p className='mt-4 text-xs leading-5 opacity-65'>Gunakan ↑ ↓ untuk berpindah, Enter untuk memilih, dan Esc untuk menutup.</p>
                    </div>
                </div>
                <div className='min-w-0'>
                    <div className='flex items-center justify-between gap-3'>
                        <h3 className='text-base font-semibold'>Hasil interaksi</h3>
                        <span className='rounded-full bg-b-gray-3/15 px-2.5 py-1 text-xs'>{selected ? 'Sudah dipilih' : 'Belum dipilih'}</span>
                    </div>
                    <p className='mb-5 mt-2 text-sm leading-6 opacity-75'>Nilai berikut diperbarui saat Anda mengetik atau memilih data.</p>
                    <dl className='divide-y divide-b-gray-3/15 rounded-xl border border-b-gray-3/20 px-5'>
                        {[
                            ['Teks pencarian', search || '—'],
                            ['ID pegawai', selected?.id ?? '—'],
                            ['Nama pegawai', selected?.name ?? '—'],
                        ].map(([label, value]) => (
                            <div key={label} className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-[130px_1fr] sm:gap-4'>
                                <dt className='text-xs leading-6 opacity-65'>{label}</dt>
                                <dd className='break-words text-sm font-medium leading-6'>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <div className='border-t border-b-gray-3/20 px-5 py-7 sm:px-8'>
                <h3 className='text-lg font-semibold tracking-tight'>Cara menggunakannya</h3>
                <div className='mt-5 grid gap-5 md:grid-cols-3'>
                    {[
                        ['01', 'Siapkan data', 'Masukkan array ke options. Gunakan getOptionLabel untuk menentukan teks pencarian dan getOptionKey untuk identitas unik setiap opsi.'],
                        ['02', 'Susun tampilan opsi', 'Gunakan children sebagai fungsi yang menerima satu item. Tampilkan nama, jabatan, atau informasi lain sesuai kebutuhan.'],
                        ['03', 'Tangani pilihan', 'onChange menerima objek lengkap. Anda bisa menyimpan objeknya, mengambil ID, atau menjalankan aksi setelah data dipilih.'],
                    ].map(([number, heading, description]) => (
                        <div key={number}>
                            <span className='font-mono text-xs opacity-50'>{number}</span>
                            <h4 className='mt-2 text-sm font-semibold'>{heading}</h4>
                            <p className='mt-2 text-sm leading-6 opacity-75'>{description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='border-t border-b-gray-3/20 px-5 py-7 sm:px-8'>
                <h3 className='text-lg font-semibold tracking-tight'>Referensi props</h3>
                <p className='mt-2 text-sm leading-6 opacity-75'>Ringkasan properti untuk menyesuaikan perilaku komponen.</p>
                <div className='mt-5 overflow-x-auto rounded-xl border border-b-gray-3/20'>
                    <table className='w-full min-w-[640px] text-left text-sm'>
                        <thead className='bg-b-gray-2/40'>
                            <tr>
                                <th className='px-4 py-3 font-semibold'>Prop</th>
                                <th className='px-4 py-3 font-semibold'>Kebutuhan</th>
                                <th className='px-4 py-3 font-semibold'>Fungsi</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-b-gray-3/15'>
                            {[
                                ['options', 'Wajib', 'Array data yang akan ditampilkan sebagai pilihan.'],
                                ['getOptionLabel', 'Wajib', 'Menghasilkan teks untuk pencarian dan isi input setelah dipilih.'],
                                ['children', 'Wajib', 'Fungsi render untuk mengatur tampilan setiap opsi.'],
                                ['onChange', 'Wajib', 'Menerima objek terpilih, atau null saat dihapus maupun mulai diketik ulang.'],
                                ['getOptionKey', 'Opsional', 'Menghasilkan key unik, misalnya ID. Default menggunakan indeks.'],
                                ['inputValue', 'Opsional', 'Mengontrol teks input dari state pemanggil, termasuk nilai awal saat edit. Pasangkan dengan onInputChange.'],
                                ['onInputChange', 'Opsional', 'Menerima teks saat diketik atau dihapus. Jika inputValue digunakan, pemilihan opsi juga mengirimkan teks label.'],
                                ['filterOption', 'Opsional', 'Mengatur pencarian khusus. Default mencari teks dari getOptionLabel tanpa membedakan huruf besar dan kecil.'],
                                ['title / placeholder', 'Opsional', 'Mengatur label input dan petunjuk pencarian.'],
                                ['emptyMessage', 'Opsional', 'Pesan ketika hasil pencarian kosong. Default: Data tidak ditemukan.'],
                                ['disabled', 'Opsional', 'Menonaktifkan input dan tombol hapus. Default: false.'],
                            ].map(([prop, required, description]) => (
                                <tr key={prop}>
                                    <td className='px-4 py-3 align-top'><code className='font-mono text-xs'>{prop}</code></td>
                                    <td className='px-4 py-3 align-top text-xs leading-6 opacity-65'>{required}</td>
                                    <td className='px-4 py-3 align-top leading-6 opacity-80'>{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='border-t border-b-gray-3/20 bg-b-gray-2/15 px-5 py-7 sm:px-8'>
                <h3 className='text-lg font-semibold tracking-tight'>Contoh kode</h3>
                <p className='mb-5 mt-2 text-sm leading-6 opacity-75'>Contoh lengkap dengan data pegawai, tampilan opsi, dan penanganan pilihan.</p>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
        </details>
    )
}

const codeString = `"use client"

import { useState } from 'react'
import BAutoComplete from '@/components/items/BAutoComplete'

const dataArrObj = [
    { id: 1, name: 'Kiken S batara, S.Si.,MT', role: 'Fullstack AI Engineer' },
    { id: 2, name: 'Riswan M Rizal. ST', role: 'Fullstack AI Engineer' },
    { id: 3, name: 'Muh. Hidayat Dermawan. ST', role: 'Fullstack AI Engineer' },
]

type Pegawai = (typeof dataArrObj)[number]

export default function ContohAutoComplete() {
    const [selected, setSelected] = useState<Pegawai | null>(null)
    const [search, setSearch] = useState('')

    return (
        <div>
            <BAutoComplete
                title="Autocomplete dinamis (Array Obj)"
                placeholder="Cari nama pegawai..."
                options={dataArrObj}
                getOptionLabel={(item) => item.name}
                getOptionKey={(item) => item.id}
                onInputChange={setSearch}
                onChange={(item) => {
                    setSelected(item)
                    // Atau simpan ID: setPegawaiId(item?.id ?? '')
                }}
            >
                {(item) => (
                    <>
                        <span className="font-semibold">{item.name}</span>
                        <small>{item.role}</small>
                    </>
                )}
            </BAutoComplete>
            <p>Teks pencarian: {search || '-'}</p>
            <p>ID terpilih: {selected?.id ?? '-'}</p>
            <p>Nama terpilih: {selected?.name ?? '-'}</p>
        </div>
    )
}`
