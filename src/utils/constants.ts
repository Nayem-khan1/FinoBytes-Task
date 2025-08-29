export const ROLES = {
  ADMIN: "admin",
  MERCHANT: "merchant",
  MEMBER: "member",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
