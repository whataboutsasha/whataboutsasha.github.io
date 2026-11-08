import { useState, useEffect, useRef } from 'react';

export const useSlideFocus = (options = { threshold: 0.7 }) => {
    const [isFocused, setIsFocused] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFocused(entry.isIntersecting);
            },
            options
        );

        const element = elementRef.current;

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return [isFocused, elementRef];
};
