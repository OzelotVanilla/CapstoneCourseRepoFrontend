import { setupIonicReact, IonApp, IonRouterOutlet, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import WelcomePage from "./pages/welcome_page/welcome.page";


setupIonicReact();

export default function App()
{
    return (<IonApp>
        <AppRouter />
    </IonApp>)
}

function AppRouter({ }: AppRouter_Props)
{
    return (<IonReactRouter><IonRouterOutlet>
        <Route path="/"><IonPage>
            <WelcomePage />
        </IonPage></Route>
    </IonRouterOutlet></IonReactRouter>)
}

type AppRouter_Props = {
}