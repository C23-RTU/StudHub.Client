'use client';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import LoginForm from './Login';
import RegistrationForm from './Register';

export default function Auth() {
    return (
        <Tabs className="mb-10">
            <TabList className="flex flex-row justify-center gap-1 items-center w-[90%] px-3 mx-auto bg-[#fff] border-2 border-[#fff] rounded mb-10 text-black">
                <Tab
                    className="rounded px-5 py-2 cursor-pointer focus:outline-none hover:bg-[#0061ffa3] hover:text-white"
                    selectedClassName="bg-[#0061FF] text-white"
                >
                    Вход
                </Tab>
                <Tab
                    className="rounded px-5 py-2 cursor-pointer focus:outline-none hover:bg-[#0061ffa3] hover:text-white"
                    selectedClassName="bg-[#0061FF] text-white"
                >
                    Регистрация
                </Tab>
            </TabList>

            <TabPanel>
                <LoginForm />
            </TabPanel>
            <TabPanel>
                <RegistrationForm />
            </TabPanel>
        </Tabs>
    );
}
