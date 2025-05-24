import BasePage from '../base.page';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';

export default class AuthPage extends BasePage {
    readonly loginForm: LoginForm = new LoginForm();
    readonly registrationForm: RegistrationForm = new RegistrationForm();

    open() {
        super.open('/');
    }

    // User login
    login(email: string, password: string) {
        this.open();
        this.loginForm.enterEmail(email);
        this.loginForm.enterPassword(password);
        this.loginForm.submit();
    }
}
