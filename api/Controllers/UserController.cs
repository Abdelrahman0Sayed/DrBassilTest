using api.Dto.User;
using api.Helpers;
using api.Interfaces;
using BassilApi.data;
using BassilApi.Dto.Auth;
using BassilApi.Models;
using BassilApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;
        public UserController(IUserServices userServices, UserManager<ApplicationUser> userManager, ApplicationDbContext context, IAuthService authService)
        {
            _userServices = userServices;
            _userManager = userManager;
            _context = context;
            _authService = authService;
        }
        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _userServices.GetAllUsers();
            if (response != null)
                return Ok(response);

            return NotFound();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost("GetUser")]
        public async Task<IActionResult> GetUser([FromQuery] UserQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response =  _userServices.GetUser(query);
            if (response != null)
                return Ok(response);

            return NotFound();
        }

        [Authorize(Policy ="AdminPolicy")]
        [HttpPost("UpgradeUser")]
        public async Task<IActionResult> Upgrade([FromHeader] string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound();

            
            user.UserRole = "Admin";
            await _userManager.AddToRoleAsync(user, "Admin");
            
            await _context.SaveChangesAsync();

            var token = _authService.GenerateToken(user);


            return Ok(new AuthResponse
            {
                Messages = "",
                Token = token,
                ExpiresOn = DateTime.Now.AddDays(1)
            });
        } 
    }
}
