// Response.d.ts for API response global type declaration

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";
export type TicketStatus = "OPEN" | "ASSIGNED" | "CLOSED" | "REOPENED";
export type AdminRole = "SUPER_ADMIN" | "AGENT";
export type KYCStatus =
  | "DOCUMENTS_REQUESTED"
  | "PENDING"
  | "PROCESSING"
  | "APPROVED"
  | "RESUBMISSION_REQUESTED"
  | "REJECTED"
  | "REQUIRES_ACTION";
export type TransactionMethod =
  | "FIAT"
  | "CRYPTO_SOLANA"
  | "CRYPTO_USDT"
  | "CRYPTO_USDC";
export type TransactionType =
  | "DEPOSIT"
  | "CREDIT"
  | "BUY_PRESALE"
  | "WITHDRAW"
  | "AIR_DROP"
  | "ADJUSTMENT";

// enum AdminRole {
//   SUPER_ADMIN,
//   AGENT,
// }

// enum KYCStatus {
//   CREATED,
//   READY_TO_REVIEW,
//   APPROVED,
//   IN_REVIEW,
//   REJECTED,
//   BLOCKED,
//   DELETED,
// }

// enum TransactionMethod {
//   FIAT,
//   CRYPTO,
// }

// enum TransactionType {
//   DEPOSIT,
//   CREDIT,
//   BUY_PRESALE,
//   WITHDRAW,
//   AIRDROP,
//   ADJUSTMENT,
// }

declare global {
  interface TypeTicket {
    id: string;
    name: string;
  }
  interface UserTicket {
    id: string;
    email: string;
    address: string;
  }
  interface AgentTicket {
    id: string;
    email: string;
    fullName: string;
    username: string;
  }
  interface MetadataResponse {
    page: number;
    limit: number;
    totalPage: number;
  }
  interface TicketResponse {
    id: string;
    priority: TicketPriority;
    status: TicketStatus;
    name: string;
    subject: string;
    message: string;
    attachment: string[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    agentId: string | null;
    typeId: string | null;
    userId: string | null;
    type: TypeTicket | null;
    user: UserTicket | null;
    agent: AgentTicket | null;
  }
  interface AdminResponse {
    id: string;
    fullName: string;
    email: string;
    username: string;
    role: AdminRole;
    createdAt: string;
    updatedAt: string;
  }
  interface TicketTypeResponse {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  interface UserKYCResponse {
    status: KYCStatus;
  }
  interface UserTransactionResponse {
    id: string;
    method: TransactionMethod;
    type: TransactionType;
    reference: string;
    amount: number;
    finalBalance: number;
    currentBalance: number;
    totalPrice: number;
    createdAt: Date;
  }
  interface UserResponse {
    id: string;
    address: string;
    email: string;
    allocation: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    kyc: UserKYCResponse | null;
    transactions: UserTransactionResponse[];
  }

  interface DistributionResponse {
    id: string;
    name: string;
    percentage: number;
    createdAt: string;
    updatedAt: string;
  }

  interface TokenResponse {
    id: string;
    name: string;
    ticker: string;
    totalSupply: number;
    totalRaised: number;
    participants: number;
    validUntil: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IcoTransaction {
    totalPrice: number;
    amount: number;
  }

  interface IcoResponse {
    id: string;
    batch: number;
    currentPrice: number;
    validUntil: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    targetAmount: number;
    maxAmount: number;
    raisedAmount: number;
    purchased: number;
    stripePriceId: string;
    transactions: IcoTransaction[];
  }

  interface AssetQuotation {
    Symbol: string;
    Name: string;
    Address: string;
    Blockchain: string;
    Price: number;
    PriceYesterday: number;
    VolumeYesterdayUSD: number;
    Time: string;
    Source: string;
    Signature: string;
  }

  interface TokenDetailsResponse {
    id: string;
    name: string;
    ticker: string;
    treasury: string;
    decimal: number;
    totalSupply: number;
    createdAt: string;
    updatedAt: string;
    stripeProductId: string;
    totalRaised: number;
    participants: number;
    validUntil: string;
  }
}
