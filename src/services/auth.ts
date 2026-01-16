import { apiPurchase } from "../configs/api";
interface ILoginRequest {
  email: string;
  senha: string;
}

interface ILoginResponse {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    perfil: string;
  };
}

enum LocalStorageKeys {
  accessToken = "vivoGold@accessToken",
  user = "vivoGold@user",
}

export { LocalStorageKeys };

type Keys = LocalStorageKeys;

class LocalStorageService {
  getItem(key: Keys): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: Keys, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: Keys): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export { LocalStorageService };

class AuthService {
  async login({ email, senha }: ILoginRequest): Promise<ILoginResponse> {
    const response = await apiPurchase.post<ILoginResponse>("/auth/login", {
      email,
      senha,
    });

    const { token, user } = response.data;
    const localStorageService = new LocalStorageService();
    localStorageService.setItem(LocalStorageKeys.accessToken, token);
    localStorageService.setItem(LocalStorageKeys.user, JSON.stringify(user));

    return { token, user };
  }

  getAuthToken(): ILoginResponse | null {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getItem(LocalStorageKeys.accessToken);
    const user = localStorageService.getItem(LocalStorageKeys.user);

    if (token && user) {
      return { token, user: JSON.parse(user) as ILoginResponse["user"] };
    }

    return null;
  }

  async logout(): Promise<void> {
    try {
      await apiPurchase.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      const localStorageService = new LocalStorageService();
      localStorageService.removeItem(LocalStorageKeys.accessToken);
      localStorageService.removeItem(LocalStorageKeys.user);
    }
  }
}

export { AuthService };
