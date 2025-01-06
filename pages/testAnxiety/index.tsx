import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '@/functions/firebase.js';
import { useRouter } from 'next/router';
import { onAuthStateChanged, User } from "firebase/auth";

const FormSchema = z.object({
    GejalaA: z.string(),
    GejalaB: z.string(),
    GejalaC: z.string(),
    GejalaD: z.string(),
    GejalaE: z.string(),
    GejalaF: z.string(),
    GejalaG: z.string(),
    GejalaH: z.string(),
    GejalaI: z.string(),
    GejalaJ: z.string(),
    GejalaK: z.string(),
    GejalaL: z.string(),
    GejalaM: z.string(),
    GejalaN: z.string(),
    GejalaO: z.string(),
    GejalaP: z.string(),
    GejalaQ: z.string(),
    GejalaR: z.string(),
    GejalaS: z.string(),
    GejalaT: z.string(),
    GejalaU: z.string(),
});

type FormDataType = z.infer<typeof FormSchema>;

const IndexPage: Page = () => {

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema)
    });
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const [anxietyStatus, setAnxietyStatus] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const now = new Date();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    });

    async function onSubmit(data: FormDataType) {

        const skorAkhir = parseInt(data.GejalaA) +
            parseInt(data.GejalaB) +
            parseInt(data.GejalaC) +
            parseInt(data.GejalaD) +
            parseInt(data.GejalaE) +
            parseInt(data.GejalaF) +
            parseInt(data.GejalaG) +
            parseInt(data.GejalaH) +
            parseInt(data.GejalaI) +
            parseInt(data.GejalaJ) +
            parseInt(data.GejalaK) +
            parseInt(data.GejalaL) +
            parseInt(data.GejalaM) +
            parseInt(data.GejalaN) +
            parseInt(data.GejalaO) +
            parseInt(data.GejalaP) +
            parseInt(data.GejalaQ) +
            parseInt(data.GejalaR) +
            parseInt(data.GejalaS) +
            parseInt(data.GejalaT) +
            parseInt(data.GejalaU);

        if (skorAkhir >= 0 && skorAkhir <= 7) {
            setAnxietyStatus('Gangguan kecemasan minimal');
            await addDoc(collection(db, "Answer_User"), {
                finalScore: skorAkhir,
                anxietyStatus: 'Gangguan kecemasan minimal',
                username: user?.email,
                userId: user?.uid,
                submittedAt: now.toISOString()
            });
        }
        else if (skorAkhir >= 8 && skorAkhir <= 15) {
            setAnxietyStatus('Gangguan kecemasan ringan');
            await addDoc(collection(db, "Answer_User"), {
                finalScore: skorAkhir,
                anxietyStatus: 'Gangguan kecemasan ringan',
                username: user?.email,
                userId: user?.uid,
                submittedAt: now.toISOString()
            });
        }
        else if (skorAkhir >= 16 && skorAkhir <= 25) {
            setAnxietyStatus('Gangguan kecemasan sedang');
            await addDoc(collection(db, "Answer_User"), {
                finalScore: skorAkhir,
                anxietyStatus: 'Gangguan kecemasan sedang',
                username: user?.email,
                userId: user?.uid,
                submittedAt: now.toISOString()
            });
        }
        else if (skorAkhir >= 26 && skorAkhir <= 63) {
            setAnxietyStatus('Gangguan kecemasan parah');
            await addDoc(collection(db, "Answer_User"), {
                finalScore: skorAkhir,
                anxietyStatus: 'Gangguan kecemasan parah',
                username: user?.email,
                userId: user?.uid,
                submittedAt: now.toISOString()
            });
        }
        setIsModalOpen(true);
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-red-600 rounded-full animate-bounce delay-400"></div>
              </div>
              <span className="ml-4 text-xl font-semibold text-gray-700">Loading...</span>
            </div>
          );
    }

    return (
        <div>
            <Title>Test For Anxiety</Title>
            <h1 className='text-4xl mb-5'>Test For Anxiety</h1>
            <p className='text-red-500'>Di bawah ini adalah daftar gejala umum kecemasan. Harap hati-hati membaca setiap item dalam daftar. Tunjukkan seberapa besar Anda merasa terganggu dengan gejala tersebut selama sebulan terakhir</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="GejalaA" className="block font-medium text-gray-700 mb-2">
                        1. Apakah merasa jantung terus berdebar dengan cepat?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaA"
                                    value={0}
                                    {...register('GejalaA')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasakan jantung saya berdebar kencang</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaA"
                                    value={1}
                                    {...register('GejalaA')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasakan jantung saya berdebar kencang, tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaA"
                                    value={2}
                                    {...register('GejalaA')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa jantung saya berdebar sedang dan terkadang tidak terasa menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaA"
                                    value={3}
                                    {...register('GejalaA')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasakan jantung saya berdebar sangat kencang dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaA']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaB" className="block font-medium text-gray-700 mb-2">
                        2. Apakah anda merasa tubuh anda terasa panas/dingin?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaB"
                                    value={0}
                                    {...register('GejalaB')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Tubuh saya tidak terasa panas/dingin</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaB"
                                    value={1}
                                    {...register('GejalaB')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Tubuh saya terasa sedikit panas/dingin tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaB"
                                    value={2}
                                    {...register('GejalaB')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa cukup panas/dingin terkadang tidak terasa menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaB"
                                    value={3}
                                    {...register('GejalaB')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sangat merasa panas/dingin dan sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaB']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaC" className="block font-medium text-gray-700 mb-2">
                        3. Apakah anda merasa mudah tegang atau tidak bisa rileks?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaC"
                                    value={0}
                                    {...register('GejalaC')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya bisa rileks</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaC"
                                    value={1}
                                    {...register('GejalaC')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya agak tidak bisa rileks, namun hal ini tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaC"
                                    value={2}
                                    {...register('GejalaC')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya agak tidak bisa rileks dan terkadang rasanya tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaC"
                                    value={3}
                                    {...register('GejalaC')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sangat tidak bisa rileks dan hal ini sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaC']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaD" className="block font-medium text-gray-700 mb-2">
                        4. Apakah anda merasa mati rasa atau kesemutan di sekujur tubuh?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaD"
                                    value={0}
                                    {...register('GejalaD')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasakan mati rasa atau kesemutan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaD"
                                    value={1}
                                    {...register('GejalaD')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasakan sedikit mati rasa atau kesemutan tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaD"
                                    value={2}
                                    {...register('GejalaD')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa mati rasa atau kesemutan sedang dan itu tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaD"
                                    value={3}
                                    {...register('GejalaD')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sering merasa mati rasa atau kesemutan dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaD']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaE" className="block font-medium text-gray-700 mb-2">
                        5. Apakah anda sering merasa kaki anda bergetar?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaE"
                                    value={0}
                                    {...register('GejalaE')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasakan goyang pada kaki</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaE"
                                    value={1}
                                    {...register('GejalaE')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami sedikit goyangan pada kaki namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaE"
                                    value={2}
                                    {...register('GejalaE')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami goyangan sedang pada kaki dan terkadang tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaE"
                                    value={3}
                                    {...register('GejalaE')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami goyangan yang parah pada kaki dan hal ini sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaE']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaF" className="block font-medium text-gray-700 mb-2">
                        6. Apakah anda merasa mengeluarkan keringat panas/dingin setiap saat?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaF"
                                    value={0}
                                    {...register('GejalaF')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak mengeluarkan keringat panas/dingin</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaF"
                                    value={1}
                                    {...register('GejalaF')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sedikit mengeluarkan keringat panas/dingin tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaF"
                                    value={2}
                                    {...register('GejalaF')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya cukup berkeringat panas/dingin dan kadang-kadang tidak terasa nyaman</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaF"
                                    value={3}
                                    {...register('GejalaF')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengeluarkan banyak keringat panas/dingin dan itu mengganggu saya banyak</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaF']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaG" className="block font-medium text-gray-700 mb-2">
                        7. Apakah anda sering merasakan sakit kepala?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaG"
                                    value={0}
                                    {...register('GejalaG')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasa pusing atau sakit kepala ringan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaG"
                                    value={1}
                                    {...register('GejalaG')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa pusing atau sakit kepala ringan tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaG"
                                    value={2}
                                    {...register('GejalaG')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa pusing atau sakit kepala ringan tidak terasa menyenangkan </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaG"
                                    value={3}
                                    {...register('GejalaG')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sering merasa pusing atau sakit kepala ringan yang parah dan itu sangat mengganggu</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaG']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaH" className="block font-medium text-gray-700 mb-2">
                        8. Apakah anda sering merasa sesak napas?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaH"
                                    value={0}
                                    {...register('GejalaH')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak mengalami kesulitan bernapas</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaH"
                                    value={1}
                                    {...register('GejalaH')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami kesulitan bernapas ringan namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaH"
                                    value={2}
                                    {...register('GejalaH')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami kesulitan bernapas sedang dan terkadang tidak terasa menyenangkan </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaH"
                                    value={3}
                                    {...register('GejalaH')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami kesulitan bernapas berat dan hal tersebut sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaH']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaI" className="block font-medium text-gray-700 mb-2">
                        9. Apakah anda merasa takut akan situasi yang terburuk akan terjadi?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaI"
                                    value={0}
                                    {...register('GejalaI')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak takut akan kejadian terburuk terjadi</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaI"
                                    value={1}
                                    {...register('GejalaI')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya agak takut akan kejadian terburuk, namun hal itu tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaI"
                                    value={2}
                                    {...register('GejalaI')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya cukup takut akan kemungkinan terburuk dan saat itu rasanya tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaI"
                                    value={3}
                                    {...register('GejalaI')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sangat takut kejadian yang terburuk dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaI']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaJ" className="block font-medium text-gray-700 mb-2">
                        10. Apakah anda sering merasakan ketakutan?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaJ"
                                    value={0}
                                    {...register('GejalaJ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasa ketakutan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaJ"
                                    value={1}
                                    {...register('GejalaJ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sedikit merasakan ketakutan, namun hal itu tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaJ"
                                    value={2}
                                    {...register('GejalaJ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasakan ketakutan dan saat itu rasanya tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaJ"
                                    value={3}
                                    {...register('GejalaJ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sering merasakan ketakutan dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaJ']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaK" className="block font-medium text-gray-700 mb-2">
                        11. Apakah anda merasa mudah gugup?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaK"
                                    value={0}
                                    {...register('GejalaK')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasa gugup</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaK"
                                    value={1}
                                    {...register('GejalaK')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sedikit merasa gugup namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaK"
                                    value={2}
                                    {...register('GejalaK')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa cukup gugup dan terkadang tidak terasa nyaman </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaK"
                                    value={3}
                                    {...register('GejalaK')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa sangat gugup dan hal tersebut sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaK']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaL" className="block font-medium text-gray-700 mb-2">
                        12. Apakah Anda memiliki rasa takut akan kematian?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaL"
                                    value={0}
                                    {...register('GejalaL')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak memiliki rasa takut akan kematian</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaL"
                                    value={1}
                                    {...register('GejalaL')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa takut mati, tapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaL"
                                    value={2}
                                    {...register('GejalaL')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa takut mati dan rasanya tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaL"
                                    value={3}
                                    {...register('GejalaL')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sangat takut mati dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaL']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaM" className="block font-medium text-gray-700 mb-2">
                        13. Apakah anda merasa tidak dapat menjaga keseimbangan?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaM"
                                    value={0}
                                    {...register('GejalaM')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasa sulit untuk menjaga keseimbangan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaM"
                                    value={1}
                                    {...register('GejalaM')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa sulit menjaga keseimbangan namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaM"
                                    value={2}
                                    {...register('GejalaM')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa sulit menjaga keseimbangan dan terkadang tidak terasa nyaman </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaM"
                                    value={3}
                                    {...register('GejalaM')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa sangat sulit menjaga keseimbangan dan hal tersebut sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaM']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaN" className="block font-medium text-gray-700 mb-2">
                        14. Apakah anda merasa tercekik?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaN"
                                    value={0}
                                    {...register('GejalaN')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasa tercekik</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaN"
                                    value={1}
                                    {...register('GejalaN')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa sedikit tercekik tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaN"
                                    value={2}
                                    {...register('GejalaN')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa tercekik dan tidak terasa menyenangkan </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaN"
                                    value={3}
                                    {...register('GejalaN')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya merasa tercekik parah dan itu sangat mengganggu</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaN']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaO" className="block font-medium text-gray-700 mb-2">
                        15. Apakah anda mengalami tremor pada tangan?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaO"
                                    value={0}
                                    {...register('GejalaO')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak mengalami tremor pada tangan </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaO"
                                    value={1}
                                    {...register('GejalaO')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami tremor pada tangan tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaO"
                                    value={2}
                                    {...register('GejalaO')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa mengalami tremor pada tangan dan tidak terasa nyaman </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaO"
                                    value={3}
                                    {...register('GejalaO')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sering mengalami tremor pada tangan dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaO']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaP" className="block font-medium text-gray-700 mb-2">
                        16. Apakah anda merasakan gemetar pada sekujur tubuh anda?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaP"
                                    value={0}
                                    {...register('GejalaP')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak mengalami gemetar pada sekujur tubuh saya </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaP"
                                    value={1}
                                    {...register('GejalaP')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami gemetar tetapi tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaP"
                                    value={2}
                                    {...register('GejalaP')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa mengalami gemetar pada tangan dan tidak terasa nyaman </span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaP"
                                    value={3}
                                    {...register('GejalaP')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sering mengalami gemetar dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaP']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaQ" className="block font-medium text-gray-700 mb-2">
                        17. Apakah anda memiliki rasa takut akan kehilangan kendali?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaQ"
                                    value={0}
                                    {...register('GejalaQ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak memiliki rasa takut kehilangan kendali</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaQ"
                                    value={1}
                                    {...register('GejalaQ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sedikit takut kehilangan kendali, namun hal ini tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaQ"
                                    value={2}
                                    {...register('GejalaQ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya cukup takut kehilangan kendali dan terkadang rasanya tidak menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaQ"
                                    value={3}
                                    {...register('GejalaQ')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sangat takut kehilangan kendali dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaQ']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaR" className="block font-medium text-gray-700 mb-2">
                        18. Apakah anda merasa takut setiap saat?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaR"
                                    value={0}
                                    {...register('GejalaR')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak merasa takut</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaR"
                                    value={1}
                                    {...register('GejalaR')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sedikit merasa takut namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaR"
                                    value={2}
                                    {...register('GejalaR')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa takut dan tidak terasa menyenangkan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaR"
                                    value={3}
                                    {...register('GejalaR')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sangat merasa takut dan hal tersebut sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaR']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaS" className="block font-medium text-gray-700 mb-2">
                        19. Apakah anda sedang mengalami gangguan pada pencernaan?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaS"
                                    value={0}
                                    {...register('GejalaS')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak mengalami gangguan pencernaan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaS"
                                    value={1}
                                    {...register('GejalaS')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami gangguan pencernaan ringan namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaS"
                                    value={2}
                                    {...register('GejalaS')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami gangguan pencernaan sedang dan rasanya tidak nyaman</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaS"
                                    value={3}
                                    {...register('GejalaS')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya mengalami gangguan pencernaan parah dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaS']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaT" className="block font-medium text-gray-700 mb-2">
                        20. Apakah ada waktu dimana anda merasa ingin pingsan?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaT"
                                    value={0}
                                    {...register('GejalaT')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak pernah merasa ingin pingsan</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaT"
                                    value={1}
                                    {...register('GejalaT')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya pernah merasa ingin pingsan namun tidak terlalu mengganggu saya</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaT"
                                    value={2}
                                    {...register('GejalaT')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya terkadang merasa ingin pingsan dan rasanya membuat saya tidak nyaman</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaT"
                                    value={3}
                                    {...register('GejalaT')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya sering merasa ingin pingsan dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaT']?.message}</p>
                </div>
                <div>
                    <label htmlFor="GejalaU" className="block font-medium text-gray-700 mb-2">
                        21. Apakah anda pernah merasakan wajah anda memerah?
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaU"
                                    value={0}
                                    {...register('GejalaU')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Saya tidak pernah merasakan wajah saya memerah.</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaU"
                                    value={1}
                                    {...register('GejalaU')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Wajah saya pernah memerah tetapi itu tidak terlalu menggangguku</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaU"
                                    value={2}
                                    {...register('GejalaU')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Wajah saya terkadang memerah dan itu sangat tidak nyaman</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-indigo-100 cursor-pointer transition duration-200 ease-in-out">
                                <input
                                    type="radio"
                                    id="GejalaU"
                                    value={3}
                                    {...register('GejalaU')}
                                    className="form-radio text-indigo-600 h-5 w-5"
                                />
                                <span className="ml-3 text-gray-700">Wajah saya sering memerah dan itu sangat mengganggu saya</span>
                            </label>
                        </div>
                    </div>
                    <p className='text-red-500'>{errors['GejalaU']?.message}</p>
                </div>
                <div className='mt-5'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'> <FontAwesomeIcon className='mr-2' icon={faChevronUp}></FontAwesomeIcon>
                        Submit
                    </button>
                </div>
            </form>
            <Modal title="You're Anxiety Level" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ className: "bg-blue-500" }}>
                <p>{anxietyStatus}</p>
            </Modal>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;