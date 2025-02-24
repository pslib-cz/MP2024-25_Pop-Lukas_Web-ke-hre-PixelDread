// import * as CookieConsent from "vanilla-cookieconsent";
import { HelmetProvider } from "react-helmet-async";
const Cookies = () => {
    return(
    <HelmetProvider>
                <title>PatchNotes Manage Page</title>
            <div>
        <main>
            <header>
                <h1>Cookie Policy</h1>
                <p>This website uses cookies. Cookies are files stored on your device when you visit a website. These files help the website identify you and your preferences, allowing the website to customize itself to your needs.</p>
            </header>
            <h2>What cookies do we use?</h2>
            <p>On this website, we use cookies to store your preferences and improve the performance of the website. We also use cookies for tracking website usage and improving our services.</p>
            <p>Types of cookies we use:</p>
            <h3>1. Necessary Cookies</h3>
            <p>These cookies are essential for the proper functioning of the website. Without them, you would not be able to use basic website functions.</p>
            <h3>2. Analytical Cookies</h3>
            <p>Analytical cookies allow us to track website usage and improve our services. These cookies collect information about how our website is used, helping us to enhance the user experience.</p>
            <h3>3. Personalized Cookies</h3>
            <p>Personalized cookies serve to provide customized content and advertisements. These cookies may be created by third parties and are used to analyze your usage of the website and show tailored advertisements.</p>
            <h2>Your Consent</h2>
            <p>By using this website, you consent to the processing of your data in accordance with our cookie policy. You can set your browser to limit or disable cookies. However, disabling cookies may limit the functionality of the website and restrict your browsing experience.</p>
            <h2>Changes to Our Cookie Policy</h2>
            <p>We may update our cookie policy in the future. If there are any changes, we will post those changes on this page. We recommend checking this page regularly for updates to the cookie policy.</p>
            <h2>Contact</h2>
            <p>If you have any questions regarding our cookies, feel free to contact me via email at <a href="mailto:jansebastiankostlan@gmail.com">jansebastiankostlan@gmail.com</a></p>
        </main>
        </div>
        </HelmetProvider>
    )
}
export default Cookies;