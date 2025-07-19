/**
 * Проверка, что пользователь зашел с мобильного устройства
 * @returns boolean
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);
}