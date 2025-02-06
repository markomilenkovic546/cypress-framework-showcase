import BasePage from '../basePage';
import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';

export default class AuthPage extends BasePage {
    readonly loginForm: LoginForm;
    readonly registrationForm: RegistrationForm;

    constructor() {
        super();
        this.loginForm = new LoginForm();
        this.registrationForm = new RegistrationForm();
    }

    open() {
        super.open('/');
    }

    // User login
    login(email: string, password: string) {
        this.open();
        this.loginForm.emailField.type(email);
        this.loginForm.passwordField.type(password);
        this.loginForm.loginBtn.click();
    }
}
