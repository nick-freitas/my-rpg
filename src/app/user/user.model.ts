export interface User {
  id: string;
  email: string;
  displayName: string;
  roles?: string[];
  library?: string[];
  published?: string[];
}
