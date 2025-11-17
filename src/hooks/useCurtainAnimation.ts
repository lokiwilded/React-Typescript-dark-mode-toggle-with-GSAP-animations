import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useCallback } from 'react';


type ToggleFunction = () => void;

export const useCurtainAnimation = (isDarkMode: boolean, toggleTheme: ToggleFunction) => {
    
    const containerRef = useRef(null);
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);
    const titleRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: containerRef });
    const runThemeAnimation = useCallback(() => contextSafe(() => { 
        const nextMode = !isDarkMode;
        const tl = gsap.timeline();
        const curtainColor = '#000';

        if (nextMode === true) {
            // GOING TO DARK MODE (Curtains CLOSE)
            tl.set([leftCurtainRef.current, rightCurtainRef.current], { 
                backgroundColor: curtainColor,
                scaleX: 0 
            })
            .to([leftCurtainRef.current, rightCurtainRef.current], {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut"
            })
            .call(toggleTheme) 
            .to({}, { duration: 0.1 }) 
            .set([leftCurtainRef.current, rightCurtainRef.current], { scaleX: 0 });

        } else {
            // GOING TO LIGHT MODE (Curtains OPEN)
            tl.set([leftCurtainRef.current, rightCurtainRef.current], { 
                backgroundColor: curtainColor,
                scaleX: 1
            })
            .call(toggleTheme) 
            .to({}, { duration: 0.1 })
            .to([leftCurtainRef.current, rightCurtainRef.current], {
                scaleX: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });
        }
    })(), [isDarkMode, contextSafe, toggleTheme]); 
    
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