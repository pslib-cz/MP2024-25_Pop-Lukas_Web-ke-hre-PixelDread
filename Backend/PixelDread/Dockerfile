# Base image pro runtime aplikace
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

# Nastavení pracovního adresáøe a portù

WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PixelDread.csproj", "."]
RUN dotnet restore "./PixelDread.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./PixelDread.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish image
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PixelDread.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "PixelDread.dll"]