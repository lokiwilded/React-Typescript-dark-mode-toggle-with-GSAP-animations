import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useCallback } from 'react';

type ToggleFunction = () => void;

export const useCurtainAnimation = (
    isDarkMode: boolean, 
    toggleTheme: ToggleFunction, 
    contentRef: React.RefObject<HTMLDivElement | null>
) => {
    
    const containerRef = useRef<HTMLDivElement>(null);
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);
    const titleRef = useRef(null);
    const isAnimating = useRef(false);
    
    const { contextSafe } = useGSAP({ scope: containerRef });

    const runThemeAnimation = useCallback(() => contextSafe(() => { 
        if (isAnimating.current) {
            return;
        }
        isAnimating.current = true;

        const nextMode = !isDarkMode;
        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false;
                toggleTheme(); // Sync React state AFTER animation is fully complete
            }
        });
        const lightBgColor = '#FFF';
        const darkBgColor = '#000';
        const lightTextColor = '#000';
        const darkTextColor = '#FFF';
        const animationDuration = 0.6;

        if (nextMode === true) {
            // GOING TO DARK MODE
            tl.set([leftCurtainRef.current, rightCurtainRef.current], { 
                scaleX: 0 
            })
            .to([leftCurtainRef.current, rightCurtainRef.current], {
                scaleX: 1,
                duration: animationDuration,
                ease: "power2.inOut"
            })
            .to(contentRef.current, {
                color: darkTextColor,
                borderColor: darkTextColor,
                duration: animationDuration,
                ease: "power2.inOut"
            }, "<")
            .to(containerRef.current, { // Animate background color with GSAP
                backgroundColor: darkBgColor,
                duration: animationDuration,
                ease: "power2.inOut"
            }, "<")
            .set([leftCurtainRef.current, rightCurtainRef.current], { scaleX: 0 });

        } else {
            // GOING TO LIGHT MODE
            tl.set([leftCurtainRef.current, rightCurtainRef.current], { 
                scaleX: 1
            })
            .to([leftCurtainRef.current, rightCurtainRef.current], {
                scaleX: 0,
                duration: animationDuration,
                ease: "power2.inOut"
            })
            .to(contentRef.current, {
                color: lightTextColor,
                borderColor: lightTextColor,
                duration: animationDuration,
                ease: "power2.inOut"
            }, "<")
            .to(containerRef.current, { // Animate background color with GSAP
                backgroundColor: lightBgColor,
                duration: animationDuration,
                ease: "power2.inOut"
            }, "<");
        }
    })(), [isDarkMode, contextSafe, toggleTheme, contentRef]); 
    
    // Initial title animation (runs once on load)
    useGSAP(() => {
        gsap.fromTo(titleRef.current, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
        );
    }, []); 

    return { 
        containerRef, 
        leftCurtainRef, 
        rightCurtainRef, 
        titleRef, 
        runThemeAnimation 
    };
};