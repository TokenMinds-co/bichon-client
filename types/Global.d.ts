// Global.d.ts for global type declaration

export {};

declare global {
  interface URLProps {
    params: { id: string };
    searchParams: { [key: string]: string | undefined };
  }
}
