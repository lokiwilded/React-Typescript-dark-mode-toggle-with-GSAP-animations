function ThemeButton({ runThemeAnimation }: { runThemeAnimation: () => void }) {
  return (
    <>
      <button className='text-black dark:text-white border-2 border-black dark:border-white px-4 py-2 rounded-3xl'
        onClick={runThemeAnimation} 
      >
        Toggle Mode
      </button>
    </>
  )
}

export default ThemeButton