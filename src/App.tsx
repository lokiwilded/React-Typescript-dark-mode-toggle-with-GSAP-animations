import { useRef } from "react";
import ThemeButton from "./components/ThemeButton"
import { useThemeToggle } from "./hooks/useThemeToggle";
import { useCurtainAnimation } from "./hooks/useCurtainAnimation";

function App() {
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const contentRef = useRef<HTMLDivElement | null>(null);
  
  const {
    containerRef, 
    leftCurtainRef, 
    rightCurtainRef, 
    titleRef, 
    runThemeAnimation 
  } = useCurtainAnimation(isDarkMode, toggleTheme, contentRef);

  return (
    <>
      <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black">

        <div 
          ref={leftCurtainRef} 
          className="fixed top-0 left-0 h-full w-1/2 bg-black origin-left scale-x-0" 
        />
        <div 
          ref={rightCurtainRef} 
          className="fixed top-0 right-0 h-full w-1/2 bg-black origin-right scale-x-0" 
        />

        <div ref={contentRef} className="relative z-10 flex-col min-h-screen w-full flex items-center justify-around text-center transition-none bg-transparent text-black dark:text-white">
          <h1 ref={titleRef} className="text-3xl font-bold">Dynamic Theme Toggle</h1>
          <ThemeButton runThemeAnimation={runThemeAnimation} /> 
        </div>

      </div>
    </>
  )
}

export default App