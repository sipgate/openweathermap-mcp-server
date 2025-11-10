import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { McpModule } from "@rekog/mcp-nest";
import { WeatherTool } from "weather.tool";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    McpModule.forRoot({
      name: "openweathermap-mcp-server",
      version: "1.0.0",
    }),
  ],
  providers: [WeatherTool],
})
export class AppModule {}
