type IconProps = React.SVGProps<SVGSVGElement>;

export const MenuIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-6 w-6 ${className}`}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    );
};

export const CloseIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-6 w-6 ${className}`}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2} d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
};

export const SearchIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${className}`}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
        </svg>
    );
};
