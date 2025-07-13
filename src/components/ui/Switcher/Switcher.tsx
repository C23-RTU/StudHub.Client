import { type ChangeEvent, Fragment } from 'react';

import './switcher.scss';

export function Switcher({
    activeTabIndex = 0,
    tabs,
    onChange,
}: {
    activeTabIndex?: number;
    tabs: string[];
    onChange: (tab_index: number) => void;
}) {
    const checkHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        onChange(index);
    };

    return (
        <div className="bg-white rounded-xl font-geologica p-[2px] w-full">
            <div className="flex justify-between w-full  h-[40px] relative box-border">
                {tabs.map((name, index) => (
                    <Fragment key={index}>
                        <input
                            className="hidden"
                            type="radio"
                            id={`radio-${index}`}
                            name="switcher-tab"
                            defaultChecked={activeTabIndex === index}
                            onChange={(event) => checkHandler(event, index)}
                        />
                        <label
                            className="flex-1 flex items-center justify-center text-black z-10 cursor-pointer"
                            htmlFor={`radio-${index}`}
                        >
                            {name}
                        </label>
                    </Fragment>
                ))}

                <div
                    className="glider flex bg-primary h-full rounded-lg absolute transition-all box-border"
                    style={{ width: `calc(100% / ${2} )` }}
                />
            </div>
        </div>
    );
}
