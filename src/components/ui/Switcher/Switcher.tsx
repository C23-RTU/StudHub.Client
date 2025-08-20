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
        <div className="font-geologica bg-background-light border-border w-full rounded-md border p-[2px] select-none">
            <div className="relative box-border flex h-[40px] w-full justify-between">
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
                            className="roundede-md z-10 flex flex-1 cursor-pointer items-center justify-center text-black dark:text-white"
                            htmlFor={`radio-${index}`}
                        >
                            {name}
                        </label>
                    </Fragment>
                ))}

                <div
                    className="glider bg-primary absolute box-border flex h-full rounded-md transition-all"
                    style={{ width: `calc(100% / ${2} )` }}
                />
            </div>
        </div>
    );
}
