import "react-circular-progressbar/dist/styles.css";
import { Page } from "@/types/Page";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "@/functions/firebase";
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Pie } from "react-chartjs-2";
import { useRouter } from 'next/router';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions
} from "chart.js";
import { onAuthStateChanged } from "firebase/auth";

ChartJS.register(ArcElement, Tooltip, Legend);

interface getDataType {
    finalScore: number,
    anxietyStatus: string,
    username: string,
    userId: string,
    submittedAt: string
}

const IndexPage: Page = () => {
    const [anxietyCounts, setAnxietyCounts] = useState({
        gangguankecemasanminimal: 0,
        gangguankecemasanringan: 0,
        gangguankecemasansedang: 0,
        gangguankecemasanparah: 0
    });
    //const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                //setUser(user);
                const docRef = doc(db, "User_Role", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("User role:", docSnap.data()["role"]);
                    //router.push("/admin");
                } else {
                    console.log("No such document!");
                    router.push("/");
                }
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    });


    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Answer_User"));
            const docsData = querySnapshot.docs.map((doc) => {
                const docData = doc.data();
                return {
                    finalScore: docData["finalScore"] || 0,
                    anxietyStatus: docData["anxietyStatus"] || "",
                    username: docData["username"] || "",
                    userId: docData["userId"] || "",
                    submittedAt: docData["submittedAt"] || "",
                } as getDataType;
            });

            const statusCounts = {
                gangguankecemasanminimal: 0,
                gangguankecemasanringan: 0,
                gangguankecemasansedang: 0,
                gangguankecemasanparah: 0
            };

            docsData.forEach((item) => {
                if (item.anxietyStatus == 'Gangguan kecemasan minimal') {
                    statusCounts.gangguankecemasanminimal++;
                }
                else if (item.anxietyStatus == 'Gangguan kecemasan ringan') {
                    statusCounts.gangguankecemasanringan++;
                }
                else if (item.anxietyStatus == 'Gangguan kecemasan sedang') {
                    statusCounts.gangguankecemasansedang++;
                }
                else if (item.anxietyStatus == 'Gangguan kecemasan parah') {
                    statusCounts.gangguankecemasanparah++;
                }
            });

            setAnxietyCounts(statusCounts);
        };
        fetchData();
    }, []);

    const pieData = {
        labels: ["Gangguan kecemasan minimal", "Gangguan kecemasan ringan", "Gangguan kecemasan sedang", "Gangguan kecemasan parah"],
        datasets: [
            {
                label: "Anxiety Status Distribution",
                data: [
                    anxietyCounts.gangguankecemasanminimal,
                    anxietyCounts.gangguankecemasanringan,
                    anxietyCounts.gangguankecemasansedang,
                    anxietyCounts.gangguankecemasanparah
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",  // Minimal
                    "rgba(54, 162, 235, 0.6)",  // Ringan
                    "rgba(255, 206, 86, 0.6)",  // Sedang
                    "rgba(255, 99, 132, 0.6)",  // Parah
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw as number;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2) + '%';
                        return `${label}: ${value} (${percentage})`;
                    }
                }
            },
            legend: {
                position: 'top',
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Anxiety Status Distribution</h1>
                <div className="flex justify-center items-center">
                    <div style={{ width: 300, height: 300 }}>
                        <Pie data={pieData} options={options} />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Total Responses: {Object.values(anxietyCounts).reduce((a, b) => a + b, 0)}</p>
                </div>
            </div>
        </div>
    );
};

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
