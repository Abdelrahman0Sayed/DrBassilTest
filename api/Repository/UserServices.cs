using api.Dto.User;
using api.Helpers;
using api.Interfaces;
using BassilApi.data;
using BassilApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserServices : IUserServices
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public UserServices(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<AllUsersResponseDto> GetAllUsers()
        {
            var users =await _context.ApplicationUsers.Select(x => new UserResponseDto
            {
                StudentName = x.StudentName,
                Email =x.Email
            }).ToListAsync();

            var response = new AllUsersResponseDto
            {
                TotalUsers = users.Count(),
                Users = users
            };
            
            return response;
        }

        public  List<UserResponseDto> GetUser(UserQueryObject query)
        {
            var users = _context.ApplicationUsers.AsQueryable().Select(x => new UserResponseDto
            {
                StudentName = x.StudentName,
                Email = x.Email
            });
            if (!string.IsNullOrEmpty(query.Email))
            {
                users = users.Where(x => x.Email == query.Email);
            }
            
            if (!string.IsNullOrEmpty(query.StudentName))
            {
                users = users.Where(x => x.StudentName.Contains(query.StudentName));
            }

            return users.ToList();
        }
    }
}
