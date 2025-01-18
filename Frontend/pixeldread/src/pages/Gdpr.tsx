import { Link } from "react-router-dom";
const GDPR = () => {
    return (
        <main>
        <header>
            <h1>GDPR</h1>
            <p>Prohlášení o souhlasu s GDPR.</p>
        </header>
        
            <h2>Vaše údaje, Vaše práva</h2>
                <p>
                    Vítejte na stránce věnované souladu s GDPR na osobním webu Jana Sebastiána Kostlána. Toto prohlášení popisuje naše závazky chránit vaše soukromí a zajišťovat bezpečnost vašich osobních údajů v souladu s Nařízením o ochraně osobních údajů (GDPR).
                </p>
                <p>
                    Respektujeme vaše právo na soukromí a kontrolu nad vašimi osobními údaji. Jako návštěvník našeho webu máte podle GDPR následující práva:
                </p>
                <ul>
                    <li>Právo na přístup: Můžete požadovat přístup k vašim osobním údajům, které zpracováváme.</li>
                    <li>Právo na opravu: Pokud jsou vaše osobní údaje nepřesné nebo neúplné, máte právo na jejich opravu nebo doplnění.</li>
                    <li>Právo na výmaz: Můžete požadovat smazání svých osobních údajů za určitých okolností.</li>
                    <li>Právo na námitku: Máte právo vznést námitku proti zpracování vašich osobních údajů pro určité účely.</li>
                </ul>
            <h2>Sběr a Použití Údajů</h2>
                <p>
                    Naše webové stránky sbírají a zpracovávají osobní údaje pouze pro explicitně uvedené účely. Vaše údaje nebudou bez vašeho souhlasu sdíleny s třetími stranami, s výjimkou případů, kdy to vyžaduje zákon.
                </p>
        
                <h2>Politika Cookies</h2>
                <p>
                    Používáme soubory cookies ke zlepšení vašeho prohlížení. Používáním našeho webu souhlasíte s používáním cookies v souladu s naší <Link to="/cookies">politikou cookies</Link>.
                </p>
            <h2>Kontaktujte Nás</h2>
                <p>
                    Pokud máte nějaké otázky nebo obavy ohledně našeho souladu s GDPR nebo zpracování vašich osobních údajů, kontaktujte nás na <a href="mailto:jansebastiankostlan@gmail.com">jansebastiankostlan@gmail.com</a>.
                </p>
        </main>
    );
    }
    export default GDPR;