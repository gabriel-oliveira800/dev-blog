abstract class Strings {
  // Error messages
  static errorInvalidGitHubAccessToken = "Token ivalid, try again";

  static gitHubUserUrl = "https://API.github.com/user";
  static gitHubAccessTokenUrl = "https://github.com/login/oauth/access_token";

  static gitHubAuthenticateUrl(clientId: string): string {
    return `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  }
}

export default Strings;
