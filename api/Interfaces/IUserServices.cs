using api.Dto.User;
using api.Helpers;

namespace api.Interfaces
{
    public interface IUserServices
    {
        public List<UserResponseDto> GetUser(UserQueryObject query);
        public Task<AllUsersResponseDto> GetAllUsers();
        
    }
}
