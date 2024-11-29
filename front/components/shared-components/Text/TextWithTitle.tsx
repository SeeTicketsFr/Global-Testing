interface TextWithTitleProps {
    title: any;
    value: any;
}

export function TextWithTitle({ title, value }: TextWithTitleProps) {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="align-middle text-sm text-gray-400">{title}</h1>
            <h1 className="font-medium max-w-[15em] overflow-hidden text-ellipsis whitespace-nowrap">{value}</h1>
        </div>
    );
}

