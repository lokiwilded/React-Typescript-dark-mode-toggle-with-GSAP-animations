import { renderHook, act } from '@testing-library/react';
import { useThemeToggle } from './useThemeToggle';

describe('useThemeToggle', () => {
  // Mock for window.matchMedia
  const matchMediaMock = (matches: boolean) => ({
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: vi.fn(), // vi is a Vitest global
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  beforeEach(() => {
    // Reset the class on the document before each test
    document.documentElement.classList.remove('dark');
  });

  it('should initialize with dark mode if system preference is dark', () => {
    // Arrange: Mock system preference to be 'dark'
    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(true));
    
    // Act
    const { result } = renderHook(() => useThemeToggle());

    // Assert
    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should initialize with light mode if system preference is not dark', () => {
    // Arrange: Mock system preference to be 'light'
    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(false));

    // Act
    const { result } = renderHook(() => useThemeToggle());

    // Assert
    expect(result.current.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle from light to dark mode', () => {
    // Arrange: Start with light mode preference
    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(false));
    const { result } = renderHook(() => useThemeToggle());
    expect(result.current.isDarkMode).toBe(false); // Initial check

    // Act
    act(() => {
      result.current.toggleTheme();
    });

    // Assert
    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle from dark to light mode', () => {
    // Arrange: Start with dark mode preference
    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(true));
    const { result } = renderHook(() => useThemeToggle());
    expect(result.current.isDarkMode).toBe(true); // Initial check

    // Act
    act(() => {
      result.current.toggleTheme();
    });

    // Assert
    expect(result.current.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
