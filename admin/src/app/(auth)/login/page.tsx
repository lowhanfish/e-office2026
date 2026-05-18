
import Image from 'next/image'
import FormLogin from './component/FormLogin'

const page = () => {

    return (
        <main className=" h-screen w-full p-2  bg-black">

            <div className='relative h-full w-full shadow-2xl rounded-[20]'>

                <Image
                    src="/images/bgx4.jpg"
                    alt='Background'
                    priority
                    fill
                    className='object-cover z-0 rounded-[20] shadow-lg opacity-90'
                />
                <div className="absolute inset-0 z-10 bg-linear-to-b from-yellow-300 via-transparent via-20% to-black" />

                <div className='relative z-10 grid grid-cols-12 h-full'>
                    <div className='col-span-6 hidden md:block p-2 '>
                        <div className='flex flex-col justify-center items-center h-full '>
                            <div className=' md:pl-20 pr-20 pt-5 pb-10 '>
                                <p className='text-white/90 font-bold text-shadow-2xs text-shadow-black'>
                                    <span className='text-[50px] text-b-yellow-3'>e-Office</span>
                                    <span className='text-[50px]'> Konsel</span>
                                </p>
                                <p className='text-white/90 text-[12px] text-shadow-2xs text-shadow-black pr-20'>
                                    e-Office merupakan aplikasi resmi Pemerintah Kabupaten Konawe Selatan yang dirancang untuk mendukung transformasi digital layanan pemerintahan secara terintegrasi, efektif, dan modern.
                                    {/* Orbit Trace adalah mesin Omnichannel Retrieval-Augmented Generation Artificial Intelligence yang mengintegrasikan data faktual secara realtime ke Website, API, WhatsApp, Instagram, Facebook, hingga TikTok Live. */}
                                </p>
                                <p className='text-white/90 text-[12px] text-shadow-2xs text-shadow-black pr-20 pt-3'>
                                    Aplikasi ini terdiri dari fitur SIMPEG, absensi pegawai, serta persuratan elektronik guna meningkatkan disiplin kerja, efisiensi administrasi, dan kemudahan pelayanan di lingkungan pemerintah daerah.
                                    {/* Dengan akurasi mutlak tanpa halusinasi, sistem ini mengotomatisasi interaksi audiens di seluruh lini digital, memastikan organisasi Anda selalu responsif dan dominan di setiap platform */}
                                </p>

                                <p className='pt-2'>By Diskominfo & Sandi</p>
                            </div>

                        </div>

                    </div>
                    <div className='col-span-12 md:col-span-6 p-1 md:p-1 flex flex-col justify-center'>
                        <div className='md:h-full p-3 items-center justify-center'>
                            <div className='bg-black/10 py-5 md:py-15 backdrop-blur-sm border-12 border-black/20 h-full md:rounded-[20]
                                flex flex-col items-center justify-center
                            '>

                                <FormLogin />

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </main>
    )
}

export default page
