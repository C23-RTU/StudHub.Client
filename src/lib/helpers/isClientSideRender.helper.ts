/**
 * Определяет среду выполнения кода (client-side или server-side)
 */
export const isClientSideRender = typeof window === 'object';
