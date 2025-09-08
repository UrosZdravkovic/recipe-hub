type BottomHoverWrapperProps = {
    children: React.ReactNode;
    onClick?: () => void;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function BottomHoverWrapper({ children, onClick, className = "", ...props }: BottomHoverWrapperProps) {
    return (
        <span
            onClick={onClick}
            {...props}
            className={`text-xs text-gray-400 cursor-pointer relative pb-1 mt-1
                hover:text-orange-500 transition-colors duration-300
                after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5
                after:bg-orange-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${className}`}
        >
            {children}
        </span>
    );
}