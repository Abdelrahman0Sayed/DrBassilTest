using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BassilApi.Dto.Auth;
using BassilApi.Models;

namespace BassilApi.Services
{
    public interface IAuthService
    {
        public string GenerateToken(ApplicationUser appUser);
        public Task<AuthResponse> CreateUserAsync(RegisterRequestDto registerRequest);
        public Task<AuthResponse> LoginAsync(LoginRequestDto loginRequest);
        public Task<AuthResponse> CreateAdmin(RegisterRequestDto newAdmin);
        public Task SendEmailAsync(string mailTo , string subject , string body , List<IFormFile> attachments);
    }
}