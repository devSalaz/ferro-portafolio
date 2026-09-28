export function useDevice() {
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  return { isDesktop }
}