import axios from "axios";
import { sign } from "jsonwebtoken";
import { Strings } from "../helpers";
import prismaClient from "../prisma";

interface AccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

class AuthenticateUserService {
  async execute(code: string) {
    const options = {
      headers: { Accept: "application/json" },
      params: {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
      },
    };

    const { data: AccessTokenResponse } = await axios.post<AccessTokenResponse>(
      Strings.gitHubAccessTokenUrl,
      null,
      options
    );

    const response = await axios.get<IUserResponse>(
      Strings.gitHubApiUrl("/user"),
      {
        headers: {
          authorization: `Bearer ${AccessTokenResponse.access_token}`,
        },
      }
    );

    console.log(response.data);

    const { id, login, name, avatar_url, followers, following, public_repos } =
      response.data;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          avatar_url,
          login,
          name,
          followers,
          following,
          public_repos,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
          followers: user.followers,
          following: user.following,
          public_repos: user.public_repos,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AccessTokenResponse, AuthenticateUserService };
