import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { Avatar, Button, ConfigProvider, Drawer, Layout, Menu, MenuProps } from "antd";
import { faBars, faHome, faCubes, faUsers, faSignOut, faSignIn, faUser, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/functions/firebase";
import { doc, getDoc } from "firebase/firestore";
//import { useSession, } from "next-auth/react";
//import nProgress from "nprogress";

const { Content, Sider } = Layout;

const sidebarBackgroundColor = '#001529';
const sidebarMenuSelectedItemBackgroundColor = '#1677ff';

const DefaultLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState(false);
    //const { data: session } = useSession();

    // menu.key must match the router.pathname, see example below: "/dashboard"
    const [selected, setSelected] = useState([router.pathname]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const docRef = doc(db, "User_Role", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("User role:", docSnap.data()["role"]);
                    setUserRole(true);
                    //router.push("/admin");
                }
            }
        });
        return () => unsubscribe();
    });

    // key must also be unique, for obvious reason
     function getMenu(): MenuProps['items'] {
        const menu: MenuProps['items'] = [];
        menu.push({
            key: '/',
            label: 'Home',
            icon: <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>,
            onClick: () => router.push('/')
        });

        const handleSignOut = () => {
            signOut(auth).then(() => {
                setUserRole(false);
                router.push('/');
                router.reload();
            });
        };

        menu.push(
            {
                key: 'AboutAnxiety',
                label: 'About Anxiety',
                icon: <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>,
                onClick: () => router.push('/aboutAnxiety')
            }
        );

        if (!user) {
            menu.push(
                {
                    key: 'Login',
                    label: 'Log In',
                    icon: <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>,
                    onClick: () => router.push('/login'),
                }
            );
        }
        else {
            menu.push(
                {
                    key: 'Test',
                    label: 'Test For Anxiety',
                    icon: <FontAwesomeIcon icon={faCubes}></FontAwesomeIcon>,
                    onClick: () => router.push('/testAnxiety')
                },
                {
                    key: 'LogOut',
                    label: 'Log Out',
                    icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
                    onClick: () => handleSignOut(),
                });
            if(userRole){
                menu.push(
                    {
                        key: 'Admin Page',
                        label: 'Admin Page',
                        icon: <FontAwesomeIcon icon={faChartPie}></FontAwesomeIcon>,
                        onClick: () => router.push('/admin'),
                    }
                );
            }
        }
        // if (status === 'authenticated') {
        //     menu.push({
        //         key: '/sign-out',
        //         label: 'Sign out',
        //         icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
        //         onClick: () => {
        //             nProgress.start();
        //             signOut();
        //             // HINT: use this method call if need to end SSO server authentication session:
        //             // signOut({
        //             //     callbackUrl: '/api/end-session'
        //             // });
        //         }
        //     });
        // } else {
        //     menu.push({
        //         key: '/sign-in',
        //         label: 'Sign in',
        //         icon: <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>,
        //         onClick: () => {
        //             nProgress.start();
        //             signIn('oidc');
        //         }
        //     });
        // }

        return menu;
    }

    //const displayUserName = session?.user?.name;

    function renderAvatar() {
        if (user) {
            return (
                <div className="flex flex-col items-center mt-6">
                    <div>
                        <Avatar size={64} icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>} />
                    </div>
                    <div className="my-4 text-white">
                        Hello, {user.email}
                    </div>
                </div>
            );
        }

        return null;
    }

    return (
        <ConfigProvider theme={{
            components: {
                Layout: {
                    // Sidebar background color:
                    // https://github.com/ant-design/ant-design/blob/5.0.0/components/layout/style/index.tsx#L101
                    colorBgHeader: sidebarBackgroundColor
                }
            }
        }}>
            <Layout className="min-h-screen">
                <Head>
                    <meta key="meta-charset" charSet="utf-8" />
                    <meta key="meta-viewport" name="viewport" content="width=device-width, initial-scale=1" />
                    <link key="favicon" rel="icon" href="/favicon.ico" />
                </Head>

                <Sider width={240} className="pb-24 hidden lg:block">
                    {renderAvatar()}
                    <ConfigProvider theme={{
                        components: {
                            Menu: {
                                // https://github.com/ant-design/ant-design/blob/5.0.0/components/menu/style/theme.tsx#L48
                                colorItemBg: sidebarBackgroundColor,
                                // https://github.com/ant-design/ant-design/blob/5.0.0/components/menu/style/theme.tsx#L133
                                colorItemBgSelected: sidebarMenuSelectedItemBackgroundColor
                            }
                        }
                    }}>
                        <Menu theme="dark" mode="vertical" items={getMenu()}
                            selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
                    </ConfigProvider>
                </Sider>
                <Drawer placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <ConfigProvider theme={{
                        components: {
                            Menu: {
                                // https://github.com/ant-design/ant-design/blob/5.0.0/components/menu/style/theme.tsx#L194
                                colorActiveBarBorderSize: 0
                            }
                        }
                    }}>
                        <Menu mode="inline" items={getMenu()}
                            selectedKeys={selected} onSelect={e => setSelected(e.selectedKeys)} />
                    </ConfigProvider>
                </Drawer>
                <Layout>
                    <div className='bg-topbar grid grid-cols-3 lg:hidden px-8 py-4 items-center'>
                        <div>
                            <Button onClick={() => setDrawerOpen(true)} type="primary">
                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                            </Button>
                        </div>
                    </div>
                    <Content className="m-5 p-8 bg-white">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export const WithDefaultLayout = (page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
