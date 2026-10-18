import type { ReactNode } from 'react'
import CodeWrapper from './CodeWrapper'

export interface DocumentationContent {
    badge: string;
    title: string;
    description: string;
    hint: string;
    steps: readonly (readonly [string, string])[];
    props: readonly (readonly [string, string, string])[];
}

export default function DocumentationSection({ documentation, children, codeString }: {
    documentation: DocumentationContent;
    children: ReactNode;
    codeString: string;
}) {
    return (
        <details className='group/documentation mt-5 min-w-0 rounded-2xl border border-b-gray-3/20 bg-b-gray-1 text-b-gray-5 shadow-sm'>
            <summary className='relative cursor-pointer list-none rounded-2xl px-5 py-6 pr-16 transition-colors hover:bg-b-gray-2/20 focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-8 sm:pr-20 [&::-webkit-details-marker]:hidden'>
                <span className='inline-flex rounded-full bg-b-gray-3/15 px-3 py-1 font-mono text-xs font-medium'>{documentation.badge}</span>
                <h2 className='mt-4 text-2xl font-semibold tracking-tight sm:text-3xl'>{documentation.title}</h2>
                <p className='mt-3 max-w-2xl text-sm leading-7 opacity-75'>{documentation.description}</p>
                <span aria-hidden='true' className='absolute right-5 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-b-gray-3/25 transition-transform group-open/documentation:rotate-180 sm:right-8'>
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round'><path d='m6 9 6 6 6-6' /></svg>
                </span>
            </summary>
            <div className='border-t border-b-gray-3/20'>
            <div className='px-5 py-7 sm:px-8'>
                <h3 className='text-base font-semibold'>Coba langsung</h3>
                <p className='mb-5 mt-2 max-w-3xl text-sm leading-6 opacity-75'>{documentation.hint}</p>
                <div className='min-w-0 rounded-xl border border-b-gray-3/20 bg-b-gray-2/20 p-4 sm:p-5'>{children}</div>
            </div>
            <div className='border-t border-b-gray-3/20 px-5 py-7 sm:px-8'>
                <h3 className='text-lg font-semibold tracking-tight'>Cara menggunakannya</h3>
                <div className='mt-5 grid gap-5 md:grid-cols-3'>
                    {documentation.steps.map(([heading, description], index) => (
                        <div key={heading}>
                            <span className='font-mono text-xs opacity-50'>{String(index + 1).padStart(2, '0')}</span>
                            <h4 className='mt-2 text-sm font-semibold'>{heading}</h4>
                            <p className='mt-2 text-sm leading-6 opacity-75'>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='border-t border-b-gray-3/20 px-5 py-7 sm:px-8'>
                <h3 className='text-lg font-semibold tracking-tight'>Referensi penggunaan</h3>
                <p className='mt-2 text-sm leading-6 opacity-75'>Properti dan nilai yang digunakan pada contoh ini.</p>
                <div className='mt-5 overflow-x-auto rounded-xl border border-b-gray-3/20'>
                    <table className='w-full min-w-[640px] text-left text-sm'>
                        <thead className='bg-b-gray-2/40'><tr>
                            {['Properti / nilai', 'Keterangan', 'Fungsi'].map((label) => <th key={label} className='px-4 py-3 font-semibold'>{label}</th>)}
                        </tr></thead>
                        <tbody className='divide-y divide-b-gray-3/15'>
                            {documentation.props.map(([prop, requirement, description]) => (
                                <tr key={prop}>
                                    <td className='px-4 py-3 align-top'><code className='font-mono text-xs'>{prop}</code></td>
                                    <td className='px-4 py-3 align-top text-xs leading-6 opacity-65'>{requirement}</td>
                                    <td className='px-4 py-3 align-top leading-6 opacity-80'>{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='rounded-b-2xl border-t border-b-gray-3/20 bg-b-gray-2/15 px-5 py-7 sm:px-8'>
                <h3 className='text-lg font-semibold tracking-tight'>Contoh kode</h3>
                <p className='mb-5 mt-2 text-sm leading-6 opacity-75'>Lihat atau salin kode untuk mencoba komponen di halaman Anda.</p>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
        </details>
    )
}
