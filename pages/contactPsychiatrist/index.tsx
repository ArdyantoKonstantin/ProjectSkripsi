import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'antd';
import { useState } from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const cards = [
    {
        title: "Syibbli Z, M.Psi., Psikolog Klinis",
        description: "Kak Sybbli adalah psikologis klinikal yang bekerja di Layanan Psikologis Bileva dengan spesialisasi di terapi orang dewasa. Kak Sybli memiliki pengalaman bertahun-tahun dalam membantu pasien dengan masalah anxiety, depression, relationship challenges, dan berbagai hal.",
        imageSrc: "psikolog.jpg",
        contactLinks: [
            { label: "Instagram Profile", url: "https://www.instagram.com/syibblizainbrin", color: "text-blue-600" },
            { label: "WhatsApp", url: "https://wa.me/082193911992", color: "text-green-600" },
            { label: "Email", url: "szinbrin@gmail.com", color: "text-green-600" }
        ],
    },
    {
        title: "Syibbli's Background",
        description: "Pengalaman kerja Kak Sybli lebih banyak diisi menangani kesehatan mental berbagai kalangan. Salah satu demografis klien yang banyak ditangani adalah klien dewasa yang sedang bekerja. Selain tekanan dari pekerjaannya itu sendiri, masalah personal yang mengganggu pekerjaan juga banyak ditemui seperti masalah relasi, hubungan percintaan, sosial, masalah adiksi tertentu, masalah emosional (depresi), hingga masalah kecemasan sangat memepengaruhi bagaimana klien bekerja. Spesialisasi masalah klinis dewasa, terkait burnout kerja, stress kerja, hubungan dan relasi sosial, Perilaku seksual dan masturbasi, seksualitas dan gender, masalah hubungan romantis, masalah depresi dan kecemasan, dan pengembangan diri. Selain itu kasus grup dan pasangan juga banyak ditemui dan membutuhkan bantuan professional.",
        imageSrc: "background.png",
        contactLinks: [],
    },
    {
        title: "Lokasi Praktek",
        description: "No. 40 RT.7/RW.6Cipete Utara, RT.2/RW.9, North Cipete, Kebayoran Baru, South Jakarta City, Jakarta 12150",
        imageSrc: "location.jpg",
        contactLinks: [
            { label: "Google Maps", url: "https://maps.app.goo.gl/tHKGmmyQv5SonBNz6", color: "text-red-600" },
            { label: "Call Now", url: "tel:+082193911992", color: "text-green-600" },
        ],
    },
];

const IndexPage: Page = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isBioExpanded, setIsBioExpanded] = useState(false);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setIsBioExpanded(false); // Reset bio expansion when moving to the next card
    };

    const previousCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        setIsBioExpanded(false); // Reset bio expansion when moving to the previous card
    };

    const toggleBioExpansion = () => {
        setIsBioExpanded(!isBioExpanded);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6 md:p-12">
            <Title>Contact Psychologist</Title>
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl">
                <div className="p-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {cards[currentIndex]?.title || "No Title Available"}
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-blue-300">
                            <Image
                                src={cards[currentIndex]?.imageSrc || "placeholder.jpg"}
                                alt={cards[currentIndex]?.title}
                                width={256}
                                height={256}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
                        {isBioExpanded
                            ? cards[currentIndex]?.description
                            : cards[currentIndex]?.description?.substring(0, 200) + '...'}
                    </p>
                    {cards[currentIndex]?.description && (
                        <button
                            onClick={toggleBioExpansion}
                            className="text-blue-600 hover:text-blue-700 mt-2"
                        >
                            {isBioExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                    <div className="mt-4">
                        {cards[currentIndex]?.contactLinks.map((link, idx) => (
                            <div key={idx} className="mb-2">
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${link.color} hover:underline`}
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
                                    {link.label}
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={previousCard}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 mr-4"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextCard}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
