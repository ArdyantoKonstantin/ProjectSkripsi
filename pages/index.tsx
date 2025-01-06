import { Button } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const IndexPage: Page = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/testAnxiety');
    };

    return (
        <div className="relative h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: 'url(a_helping_hand.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 max-w-3xl p-10 bg-opacity-70 rounded-lg shadow-lg"
            >
                <Title>Selamat Datang</Title>
                <div className="text-center space-y-6">
                    <p className="text-4xl font-bold text-yellow-300">Halo,</p>
                    <p className="text-2xl lg:text-4xl font-semibold text-blue-200 leading-snug">
                        Apakah Anda Mengalami Gangguan Mental Kecemasan?
                    </p>
                    
                    <div className="border-l-4 border-blue-500 pl-4 mt-6 text-lg lg:text-xl text-blue-100">
                        <p className="mb-2">Mari Mulai Tes</p>
                        <p>Apakah Anda Membutuhkan Pertolongan Atau Tidak?</p>
                    </div>
                    
                    <p className="text-lg font-medium lg:text-xl text-blue-200 mt-8">
                        Silahkan Klik Tombol Dibawah ini
                    </p>

                    <Button 
                        className="px-8 py-4 mt-4 font-bold text-lg lg:text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                        style={{ lineHeight: '1.5', height: 'auto' }}
                        onClick={handleClick}
                    >
                        Mulai Tes
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
