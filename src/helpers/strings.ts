abstract class Strings {
  // Error messages
  static errorExpiredToken = "Token expired";
  static errorInvalidToken = "Token not provided";
  static errorInvalidGitHubAccessToken = "Token ivalid, try again";

  static gitHubAccessTokenUrl = "https://github.com/login/oauth/access_token";

  static gitHubApiUrl(path: string): string {
    return `https://api.github.com${path}`;
  }

  static gitHubAuthenticateUrl(clientId: string): string {
    return `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  }
}

export default Strings;
