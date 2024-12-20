// Global.d.ts for global type declaration

import { TransactionMethod } from "./Response";

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

  interface Token {
    name: string;
    symbol: string;
    address: string;
    host: string;
    feed: string;
    balance: number;
    decimals: number;
    method: TransactionMethod;
  }

  interface PartnerCardProps {
    name: string;
    icon: React.ReactElement;
  }

  interface RoadmapCardProps {
    title: string;
    desc?: string;
    time: string;
    items?: RoadmapItemProps[];
  }

  interface RoadmapItemProps {
    title: string;
    desc: string | ItemProp[];
  }

  interface ItemProp {
    title: string;
    desc: string;
  }

  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }

  interface TeamMemberCardProps {
    index: number;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    member: Member;
  }

  interface SeeMoreDetailProps {
    member: Member;
  }

  interface Member {
    name: string;
    position: string;
    imageUrl: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: any;
  }
}
