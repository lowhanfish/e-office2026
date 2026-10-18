import TitleBar from '@/components/TitleBar'
import ListUser from './components/ListUser';
import ListDocuments from './components/ListDocuments';
import InputData from './components/InputData';
import BCheckBox from './components/BCheckBox';
import InputDataACT from './components/InputDataACT';
import InputDataAutoComplete from './components/InputDataAutoComplete';
import BTable from './components/BTable';
import BInputRadioButton from './components/BInputRadioButton';
import ListModal from './components/ListModal';
import ListButton from './components/ListButton';
import ListChart from './components/ListChart';
import ListPagination from './components/ListPagination';









const sections = [
    { id: 'input', label: 'Input', component: InputData },
    { id: 'checkbox', label: 'Checkbox', component: BCheckBox },
    { id: 'radio', label: 'Radio button', component: BInputRadioButton },
    { id: 'autocomplete', label: 'Autocomplete', component: InputDataACT },
    { id: 'autocomplete-dinamis', label: 'Autocomplete dinamis', component: InputDataAutoComplete },
    { id: 'dokumen', label: 'Dokumen', component: ListDocuments },
    { id: 'profil', label: 'Profil', component: ListUser },
    { id: 'tabel', label: 'Tabel', component: BTable },
    { id: 'tombol', label: 'Tombol', component: ListButton },
    { id: 'pagination', label: 'Pagination', component: ListPagination },
    { id: 'modal', label: 'Modal', component: ListModal },
    { id: 'grafik', label: 'Grafik', component: ListChart },
]

export default function ComponentTemplatePage() {
    return (
        <div className='min-w-0 pb-10'>
            <TitleBar title='Dokumentasi Komponen' subtitle='Template Management' />
            <div className='my-6 rounded-2xl border border-b-gray-3/20 bg-b-gray-1 px-5 py-6 text-b-gray-5 sm:px-8'>
                <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Komponen antarmuka</h1>
                <p className='mt-3 max-w-2xl text-sm leading-7 opacity-75'>
                    Panduan komponen untuk membangun halaman yang konsisten. Coba demonya,
                    pelajari properti yang tersedia, lalu salin contoh kode sesuai kebutuhan.
                </p>
                <nav aria-label='Daftar komponen' className='mt-5 flex flex-wrap gap-2'>
                    {sections.map(({ id, label }) => (
                        <a key={id} href={`#${id}`} className='rounded-full border border-b-gray-3/25 px-3 py-2 text-xs font-medium transition-colors hover:bg-b-gray-3/15 focus-visible:outline-2 focus-visible:outline-offset-2'>{label}</a>
                    ))}
                </nav>
            </div>
            <div className='space-y-8'>
                {sections.map(({ id, component: Component }) => (
                    <div key={id} id={id} className='min-w-0 scroll-mt-24'><Component /></div>
                ))}
            </div>
        </div>
    )
}
