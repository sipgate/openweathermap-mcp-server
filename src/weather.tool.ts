import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Context, Tool } from "@rekog/mcp-nest";
import axios from "axios";
import z from "zod";

const WEATHER_API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

@Injectable()
export class WeatherTool {
  constructor(private readonly configService: ConfigService) {}

  @Tool({
    name: "get-weather",
    description: "Get current weather for a city using OpenWeatherMap API.",
    parameters: z.object({
      city: z.string().describe("City name to get weather for"),
    }),
  })
  async getWeather({ city }: { city: string }, _context: Context) {
    const apiKey = this.configService.get<string>("OWM_API_KEY");

    if (!apiKey) {
      throw new Error("OWM_API_KEY is not set");
    }

    return await axios.get(WEATHER_API_ENDPOINT, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });
  }
}
