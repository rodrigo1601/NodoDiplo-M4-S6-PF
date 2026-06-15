import { GenreProvider } from "../context/genres/GenreProvider";
import { PlatformProvider } from "../context/platforms/PlatformProvider";
import { DeveloperProvider } from "../context/developers/DeveloperProvider";
import { GameProvider } from "../context/games/GameProvider";
import { AuthProvider } from "../context/users/AuthProvider";
import { UserGamesProvider } from "../context/userGames/UserGamesProvider";
import { UserProvider } from "../context/users/userProvider";
import { ThemeProvider } from "../context/theme/ThemeProvider";

const AppProviders = ({ children }) => {
    return (
        <ThemeProvider>
            <GenreProvider>
                <PlatformProvider>
                    <DeveloperProvider>
                        <UserProvider>
                            <AuthProvider>
                                <GameProvider>
                                    <UserGamesProvider>
                                        {children}
                                    </UserGamesProvider>
                                </GameProvider>
                            </AuthProvider>
                        </UserProvider>
                    </DeveloperProvider>
                </PlatformProvider>
            </GenreProvider>
        </ThemeProvider>
    );
};

export default AppProviders;