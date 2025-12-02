import 'vue-recaptcha-v3';

declare module 'vue-recaptcha-v3' {
  interface IReCaptchaComposition {
    execute(action: string): Promise<string>;
  }
}
