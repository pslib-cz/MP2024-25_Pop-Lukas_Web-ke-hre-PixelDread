export type AppState = {
    token: string | null;
    adminId: number | null;
    isLoggedIn: boolean;
    email: string;
    loading: boolean,
    error: null | string,
  };
  