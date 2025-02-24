import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
const GDPR = () => {
    return (<>
    <HelmetProvider>
        <title>GDPR</title>
            <main>
                <header>
                    <h1>GDPR</h1>
                    <p>Privacy Policy Statement.</p>
                </header>

                <h2>Your Data, Your Rights</h2>
                <p>
                    Welcome to the page dedicated to GDPR compliance on Jan Sebastián Kostlán's personal website. This statement describes our commitments to protecting your privacy and ensuring the security of your personal data in accordance with the General Data Protection Regulation (GDPR).
                </p>
                <p>
                    We respect your right to privacy and control over your personal data. As a visitor to our website, you have the following rights under GDPR:
                </p>
                <ul>
                    <li>Right of access: You can request access to your personal data that we process.</li>
                    <li>Right of rectification: If your personal data is inaccurate or incomplete, you have the right to correct or supplement it.</li>
                    <li>Right of erasure: You can request the deletion of your personal data under certain circumstances.</li>
                    <li>Right to object: You have the right to object to the processing of your personal data for specific purposes.</li>
                </ul>

                <h2>Data Collection and Use</h2>
                <p>
                    Our website collects and processes personal data only for explicitly stated purposes. Your data will not be shared with third parties without your consent, except in cases where required by law.
                </p>

                <h2>Cookies Policy</h2>
                <p>
                    We use cookies to improve your browsing experience. By using our website, you consent to the use of cookies in accordance with our <Link to="/cookie-policy">cookie policy</Link>.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns regarding our GDPR compliance or the processing of your personal data, please contact us at <a href="mailto:jansebastiankostlan@gmail.com">jansebastiankostlan@gmail.com</a>.
                </p>
            </main>
            </HelmetProvider>

        </>
    );
};

export default GDPR;