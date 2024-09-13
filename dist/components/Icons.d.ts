import { default as React } from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;
export declare const HomeIcon: ({ size, color }: {
    size?: string;
    color?: string;
}) => any;
export declare const AssemblyCapitalLogo: ({ width, height, color }: {
    width?: string;
    height?: string;
    color?: string;
}) => any;
export declare const HamburgerIcon: ({ width, height, color }: {
    width?: string;
    height?: string;
    color?: string;
}) => any;
export declare function IconMail({ size, ...props }: {
    [x: string]: any;
    size?: string;
}): any;
export declare function IconMailUnread({ size, ...props }: {
    [x: string]: any;
    size?: string;
}): any;
export declare const XIcon: React.FC<IconProps>;
export declare const PlusIcon: React.FC<IconProps>;
export {};
