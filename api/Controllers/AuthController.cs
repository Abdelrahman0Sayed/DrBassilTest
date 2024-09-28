using BassilApi.Dto.Auth;
using BassilApi.Services;
using Microsoft.AspNetCore.Mvc;
using BassilApi.Models;
using Microsoft.AspNetCore.Identity;
using System.Web;
using api.Dto.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Google.Apis.Auth;
using System.IdentityModel.Tokens.Jwt;
namespace BassilApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        public AuthController(IAuthService authService, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _authService = authService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterRequestDto registerRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _authService.CreateUserAsync(registerRequest);
            if (response.Messages != "")
                return BadRequest(response.Messages);


            var appUser = await _userManager.FindByEmailAsync(registerRequest.Email);
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
            var ConfirmationLink = $"http://localhost:3000/EmailVerified?token={confirmationToken}&email={appUser.Email}";

            var emailRequest = new EmailRequestDto
            {
                Confirmation = ConfirmationLink,
                ToEmail = appUser.Email
            };

            await SendEmailConfirmation(emailRequest);

            return Ok();
        }

        
        private async Task SendEmailConfirmation(EmailRequestDto emailRequest)
        {
            
            var temp_path = $"{Directory.GetCurrentDirectory()}\\Templates\\Welcome.html";
            var mailText = await System.IO.File.ReadAllTextAsync(temp_path);
            
            mailText = mailText.Replace("[verify_link]", emailRequest.Confirmation);
            
            await _authService.SendEmailAsync(emailRequest.ToEmail, "Email Confirmation", mailText , null);

        }
        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmailAsync(string token, string email)
        {
            var appUser = await _userManager.FindByEmailAsync(email);
            var decodedToken = HttpUtility.UrlDecode(token);
            decodedToken = decodedToken.Replace(" ", "+");
            if (appUser != null)
            {
                var result = await _userManager.ConfirmEmailAsync(appUser, decodedToken);
                if (result.Succeeded)
                    return StatusCode(StatusCodes.Status200OK);
                else
                    return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return NotFound();
        }




        
        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginRequestDto loginRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _authService.LoginAsync(loginRequest);

            if (response.Messages != "")
                return BadRequest(response);

            var appUser = await _userManager.FindByEmailAsync(loginRequest.Email);
            if (appUser.TwoFactorEnabled)
            {
                await _signInManager.SignOutAsync();
                await _signInManager.PasswordSignInAsync(appUser, loginRequest.Password, false, true);

                var TwoFAToken = await _userManager.GenerateTwoFactorTokenAsync(appUser, "Email");
                var TwoFARequest = new TwoFADto
                {
                    Email = loginRequest.Email,
                    OTPCode= TwoFAToken
                };
                await Send2FA(TwoFARequest);
            }

            return Ok();
        }

        [HttpPost("Send2FA")]
        private async Task<IActionResult> Send2FA(TwoFADto dto)
        {
            var temp_path = $"{Directory.GetCurrentDirectory()}\\Templates\\2FA.html";
            var mailText = await System.IO.File.ReadAllTextAsync(temp_path);
            mailText = mailText.Replace("[otp]", dto.OTPCode);

            await _authService.SendEmailAsync(dto.Email, "OTP Verification", mailText, null);

            return Ok();
        }
        [HttpPost("Confirm2FA")]
        public async Task<IActionResult> Confirm2FA(string token, string email)
        {
            var appUser = await _userManager.FindByEmailAsync(email);
            if (appUser != null)
            {
                var result = await _userManager.VerifyTwoFactorTokenAsync(appUser, "Email", token);
                if (result)
                {
                    var userToken = _authService.GenerateToken(appUser);
                    var responseDto = new AuthResponse
                    {
                        Messages = "",
                        Token = userToken,
                        ExpiresOn = DateTime.Now.AddDays(7)
                    };
                    await _userManager.SetAuthenticationTokenAsync(appUser, JwtBearerDefaults.AuthenticationScheme, "AuthToken", token);
                    return Ok(responseDto);
                }
                else
                    return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NotFound();
        }



        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var appUser = await _userManager.FindByEmailAsync(email);
            if (appUser == null)
                return NotFound();
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(appUser);
            var resetLink = $"http://localhost:3000/ResetPassword?token={resetToken}&email={appUser.Email}";
            var emailRequest = new EmailRequestDto
            {
                ToEmail = email,
                Confirmation = resetLink,
            };
            await SendResetPassword(emailRequest);
            return Ok();
        }
        [HttpPost("SendResetPassword")]
        private async Task<IActionResult> SendResetPassword([FromBody] EmailRequestDto dto)
        {
            var temp_path = $"{Directory.GetCurrentDirectory()}\\Templates\\ForgotPassword.html";
            var mailText = await System.IO.File.ReadAllTextAsync(temp_path);

            mailText = mailText.Replace("[reset]", dto.Confirmation);

            await _authService.SendEmailAsync(dto.ToEmail, "Reset Password" , mailText, null);

            return Ok();
        }
        [HttpPost("ConfirmResetPassword")]
        public async Task<IActionResult> ConfirmResetPassword(string token, string email, string newPassword)
        {
            var appUser = await _userManager.FindByEmailAsync(email);
            var decodedToken = HttpUtility.UrlDecode(token);
            decodedToken = decodedToken.Replace(" ", "+");
            if (appUser != null)
            {
                var result = await _userManager.ResetPasswordAsync(appUser, token, newPassword);
                if (result.Succeeded)
                    return StatusCode(StatusCodes.Status200OK);
                else
                    return BadRequest(result.Errors);
            }
            return NotFound();
        }

        [Authorize(Policy ="AdminPolicy")]
        [HttpPost("AddAdmin")]
        public async Task<IActionResult> CreateAdmin(RegisterRequestDto requestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _authService.CreateAdmin(requestDto);
            if (response.Messages != "")
                return BadRequest(response.Messages);


            var appUser = await _userManager.FindByEmailAsync(requestDto.Email);
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
            var ConfirmationLink = $"http://localhost:3000/EmailVerified?token={confirmationToken}";

            var emailRequest = new EmailRequestDto
            {
                Confirmation = ConfirmationLink,
                ToEmail = appUser.Email
            };

            await SendEmailConfirmation(emailRequest);
            return Ok(response);
        }

        [HttpPost]
        [AllowAnonymous] 
        [Route("Sign-with-Google")]
        public async Task<IActionResult> SigninGoogle([FromBody] string token)
        {
            try
            {
                
                var payload =await GoogleJsonWebSignature.ValidateAsync(token);
                if (payload == null)
                {
                    return BadRequest("Google Auth is not valid");
                }

                
                var user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    var newUser = new ApplicationUser
                    {
                        StudentName = payload.Name,
                        UserName = payload.Email.Split("@")[0],
                        Email = payload.Email,
                        EmailConfirmed = true,
                        UserRole = "User",
                    };
                    await _userManager.CreateAsync(newUser);

                    var newUserToken = _authService.GenerateToken(newUser);
                    return Ok(newUserToken);
                }

                
                await _signInManager.SignInAsync(user, isPersistent: false);

                var userToken = _authService.GenerateToken(user);
                return Ok(userToken);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}