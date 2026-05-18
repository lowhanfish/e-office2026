
import Image from 'next/image'
import FormLogin from './component/FormLogin'

const page = () => {

    return (
        <main className=" h-screen w-full p-2 md:px-20 bg-black">

            <div className='relative h-full w-full shadow-2xl rounded-[20]'>

                <Image
                    src="/images/bg.png"
                    alt='Background'
                    priority
                    fill
                    className='object-cover z-0 rounded-[20] shadow-lg opacity-90'
                />
                <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent via-20% to-black" />

                <div className='relative z-10 grid grid-cols-12 h-full'>
                    <div className='col-span-6 hidden md:block p-2 '>
                        <div className='flex flex-col justify-center items-center h-full '>
                            <div className=' pl-5 pr-20 pt-5 pb-10 '>
                                <p className='text-white/90 font-bold text-shadow-2xs text-shadow-black'>
                                    <span className='text-[50px] text-b-blue-3'>ORBIT</span>
                                    <span className='text-[50px]'> Trace</span>
                                </p>
                                <p className='text-white/90 text-[12px] text-shadow-2xs text-shadow-black pr-20'>
                                    Orbit Trace is an Omnichannel Retrieval-Augmented Generation AI engine that integrates real-time factual data across Websites, APIs, WhatsApp, Instagram, Facebook, and TikTok Live.
                                    {/* Orbit Trace adalah mesin Omnichannel Retrieval-Augmented Generation Artificial Intelligence yang mengintegrasikan data faktual secara realtime ke Website, API, WhatsApp, Instagram, Facebook, hingga TikTok Live. */}
                                </p>
                                <p className='text-white/90 text-[12px] text-shadow-2xs text-shadow-black pr-20 pt-3'>
                                    With absolute accuracy and zero hallucinations, this system automates audience interactions across all digital channels, ensuring your organization remains responsive and dominant on every platform.
                                    {/* Dengan akurasi mutlak tanpa halusinasi, sistem ini mengotomatisasi interaksi audiens di seluruh lini digital, memastikan organisasi Anda selalu responsif dan dominan di setiap platform */}
                                </p>

                                <p className='pt-2'>By BeevoraLabs</p>
                            </div>

                        </div>

                    </div>
                    <div className='col-span-12 md:col-span-6 p-0 md:p-0 flex flex-col justify-center'>
                        <div className='md:h-full p-3 items-center justify-center'>
                            <div className='bg-black/10 p-5 md:px-30 md:py-15 backdrop-blur-sm border-12 border-black/20 h-full flex flex-col gap-1 md:rounded-[20]'>

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
