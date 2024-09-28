using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BassilApi.Dto.Auth;
using BassilApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MailKit.Security;
using Org.BouncyCastle.Asn1.Ess;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using BassilApi.data;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.AspNetCore.Authentication.JwtBearer;


namespace BassilApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly MailSettings _mailSettings;
        
        private readonly ApplicationDbContext _context;
        public AuthService(UserManager<ApplicationUser> userManager  , IConfiguration config ,SignInManager<ApplicationUser> signInManager , IOptions<MailSettings> mailSettings, ApplicationDbContext context){
            _userManager = userManager;
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _signInManager = signInManager;
            _mailSettings = mailSettings.Value;
            _context = context;
        }



        public  string GenerateToken(ApplicationUser appUser)
        {
            
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, appUser.UserName),
                new Claim(ClaimTypes.Role, appUser.UserRole),
            };
            
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                SigningCredentials = creds,
                Subject = new ClaimsIdentity(claims),
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"],
                Expires= DateTime.Now.AddDays(7)
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }


        public async Task<AuthResponse> CreateUserAsync(RegisterRequestDto registerRequest)
        {
            var userName = registerRequest.Email?.Split("@")[0];

            var userEmail = await _userManager.FindByEmailAsync(registerRequest.Email);
            if (userEmail is not null)
                return new AuthResponse { Messages = "User's already exist." };


            var appUser = new ApplicationUser {
                Email = registerRequest.Email,
                StudentName = registerRequest.StudentName,
                UserName = userName,
                TwoFactorEnabled = true,
                UserRole ="User"
            };

            var result = await _userManager.CreateAsync(appUser, registerRequest.Password);
            if (!result.Succeeded) {
                var errors = String.Empty;

                foreach (var error in result.Errors)
                {
                    errors += $"{error.Description}, ";
                }

                return new AuthResponse { Messages = errors };
            }
            await _userManager.AddToRoleAsync(appUser, "User");

            var token = GenerateToken(appUser);
            await _userManager.SetAuthenticationTokenAsync(appUser, JwtBearerDefaults.AuthenticationScheme, "AuthToken", token);

            var response = new AuthResponse {
                Messages ="" ,
                Token = token,
                ExpiresOn = DateTime.Now.AddDays(7)
            };

            return response;
        }


        public async Task<AuthResponse> LoginAsync(LoginRequestDto loginRequest)
        {
            
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            if(user is null)
                return new AuthResponse{Messages = "User's not found."};
            
            
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password , false);
            if(!result.Succeeded)
                return new AuthResponse{Messages = "Invalid Password."};
            

            return new AuthResponse{
                Messages = "" ,
            };
        }

        

        public async Task SendEmailAsync(string mailTo , string subject , string body , List<IFormFile> attachments){
            
            var mail = new MimeMessage()
            {
                Sender = MailboxAddress.Parse(_mailSettings.Email),
                Subject = subject,
            };
            
            mail.To.Add(MailboxAddress.Parse(mailTo));
            
            var builder = new BodyBuilder();
            if (attachments != null)
            {
                byte[] fileBytes;

                foreach(var attachment in attachments)
                {
                    if(attachment.Length > 0)
                    {
                        using var ms = new MemoryStream();
                        attachment.CopyTo(ms);
                        fileBytes = ms.ToArray(); 
                        builder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
                    }

                }
            };
            
            builder.HtmlBody = body;
            mail.Body = builder.ToMessageBody();
            mail.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Email));

            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Email, _mailSettings.Password);
            
            await smtp.SendAsync(mail);
            
            smtp.Disconnect(true);
        }

        public async Task<AuthResponse> CreateAdmin(RegisterRequestDto newAdmin)
        {
            var adminEmail = await _userManager.FindByEmailAsync(newAdmin.Email);
            if (adminEmail is not null)
                return new AuthResponse { Messages = "Email is already exists." };

            var userName = newAdmin.Email.Split("@")[0];
            var adminUser = new ApplicationUser
            {
                Email = newAdmin.Email,
                StudentName= newAdmin.StudentName,
                TwoFactorEnabled= true,
                UserName = userName,
                UserRole = "Admin"
            };
            var result = await _userManager.CreateAsync(adminUser, newAdmin.Password);
            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                {
                    errors += $"{error.Description}, ";
                }
                return new AuthResponse { Messages = errors };
            }

            await _userManager.AddToRoleAsync(adminUser, "Admin");

            var token = GenerateToken(adminUser);
            await _userManager.SetAuthenticationTokenAsync(adminUser, JwtBearerDefaults.AuthenticationScheme, "AuthToken",token);
            return new AuthResponse
            {
                Messages = "",
                Token = token,
                ExpiresOn = DateTime.Now.AddDays(1)
            };
        }
    }
}