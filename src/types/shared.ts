/**
 * Types shared with the acpg-lineoa API's contract (User, LineProfile,
 * AuthSession, ...), vendored here since this app now lives in its own repo.
 */

export type UserRole =
  | "AGENT"
  | "BORROWER"
  | "CUSTOMER"
  | "Agent"
  | "Borrower"
  | "Customer"
  | "agent"
  | "borrower"
  | "customer"
  | "staff"
  | "admin";

export interface User {
  id: string;
  lineUserId: string;
  displayName: string;
  pictureUrl: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/** Profile shape returned by the LIFF SDK's liff.getProfile(). */
export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

/** Session issued by POST /auth/line/callback. */
export interface AuthSession {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: User;
}

export interface ApiErrorBody {
  error: {
    message: string;
    code: string;
  };
}
