import clsx from "clsx";
import type { ElementType } from "react";

type SplitWordsProps = {
    text: string;
    className?: string;
    as?: ElementType;
};

export default function SplitWords({
    text,
    className,
    as = "span",
}: SplitWordsProps) {
    const Tag = as;
    const words = text.split(" ");

    return (
        <Tag data-split-heading className={clsx("inline-block", className)}>
            {words.map((word, index) => (
                <span
                    key={`${word}-${index}`}
                    data-split-word
                    className="inline-block will-change-transform"
                >
                    {word}
                    {index < words.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </Tag>
    );
}
