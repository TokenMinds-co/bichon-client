// Global.d.ts for global type declaration

export {};

declare global {
  interface URLProps {
    params: { id: string };
    searchParams: { [key: string]: string | undefined };
  }

  interface OverviewProps {
    totalToken: string;
    tokenPrice: string;
  }

  interface TransactionHistoryProps {
    transactions: UserTransactionResponse[];
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
  }

  interface TablePaginationProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
  }

  interface DashboardData {
    tokenPrice: string;
    totalToken: string;
    transactions: UserTransactionResponse[];
  }
}
