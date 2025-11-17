function ThemeButton({ runThemeAnimation }: { runThemeAnimation: () => void }) {
  return (
    <>
      <button className='border-2 px-4 py-2 rounded-3xl'
        onClick={runThemeAnimation} 
      >
        Toggle Mode
      </button>
    </>
  )
}

export default ThemeButton