import Keycloak from "keycloak-js";

export default class UserService {
  private keycloak = new Keycloak({
    url: "https://lemur-6.cloud-iam.com/auth",
    realm: "akapoor-iam",
    clientId: "salespoint-react-app",
  });

  private static instance: UserService;
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public initKeycloak(renderApp: { (): void; (): void }): void {
    this.keycloak
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
      })
      .then((authenticated) => {
        if (!authenticated) {
          console.log("User Not Authenticated");
        }
        renderApp();
      })
      .catch(console.error);
  }

  public doLogin(): void {
    this.keycloak.login();
  }

  public doLogout(): void {
    this.keycloak.logout();
  }

  public getToken() {
    return this.keycloak.token;
  }

  public getTokenParsed() {
    return this.keycloak.tokenParsed;
  }

  public isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

  public getUsername() {
    return this.keycloak.tokenParsed?.preferred_username;
  }

  public updateToken(): string {
    return this.keycloak.tokenParsed?.preferred_username;
  }

  public hasRole(roles: string[]) {
    return roles.some((role) => this.keycloak.hasRealmRole(role));
  }
}
