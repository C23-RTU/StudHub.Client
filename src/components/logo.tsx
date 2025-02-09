import type { SVGProps } from 'react';

export const SetkaLogo = ({ ...props }: SVGProps<SVGSVGElement>) => (
    <svg width={32} height={32} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" {...props}>
        <path d="M100.5,400h-.5c.17,0,.33,0,.5-.01h0Z" style={{ fill: '#FFFFFF' }} />
        <path
            d="M400,100c0,55.06-44.5,99.73-99.5,99.99-.17.01-.33.01-.5.01h-100L0,0h300c.17,0,.33,0,.5.01,55,.26,99.5,44.93,99.5,99.99Z"
            style={{ fill: '#FFFFFF' }}
        />
        <polygon points="200.5 200 200.5 200.5 200 200 200.5 200" style={{ fill: '#FFFFFF' }} />
        <polygon points="199.5 199.5 200 200 199.5 200 199.5 199.5" style={{ fill: '#FFFFFF' }} />
        <path d="M300.5,0h-.5.5Z" style={{ fill: '#FFFFFF' }} />
        <path d="M300,200c.17,0,.33,0,.5-.01h0s-.5.01-.5.01Z" style={{ fill: '#FFFFFF' }} />
        <path
            d="M400,400H100c-55.23,0-100-44.77-100-100s44.77-100,100-100c.17,0,.33,0,.5.01h0s99.5-.01,99.5-.01l200,200Z"
            style={{ fill: '#FFFFFF' }}
        />
    </svg>
);
