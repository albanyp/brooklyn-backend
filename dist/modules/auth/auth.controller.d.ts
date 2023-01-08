import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    findAll(): string;
    signUp(signUpDto: SignUpDto): Promise<SignUpDto>;
}
